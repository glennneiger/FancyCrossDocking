import { ToastAndroid } from 'react-native';
import Constants from './constants';
import { manageErrors } from './ErrorHandling';
import {
  digestParcelsForInbound,
  digestParcelsFromStock,
  setMessageForException,
  setMessageForHandlingState,
} from './DigestData';
import {
  getMlkCode, isMlkCode, objectHasKeys, sortRow, storageGetItem, updateAfterScan,
} from './Utils';
import FetchData from './FetchData';
import { getDefault } from './scanResponse';

export async function getAsyncData(url, data) {
  return FetchData.get(FetchData.composeUrl(url, data));
}

export const getList = (items, merchants) => items.map((item, index) => ({
  label: item,
  key: String(index),
  stockScanned: merchants[item]['In Stock'].scanned,
  stockTotal: merchants[item]['In Stock'].total,
  bayScanned: merchants[item]['To Load'].scanned,
  bayTotal: merchants[item]['To Load'].total,
}));

export const getFromStockList = (items, merchants) => items.map((item, index) => ({
  label: item,
  key: String(index),
  scanned: merchants[item] ? merchants[item].scanned : 0,
  total: merchants[item] ? merchants[item].total : 0,
}));

export const getListByMerchant = (merchants, selectedItem, type) => {
  const items = merchants[selectedItem][type];
  const merchantsKeys = Object.keys(items.parcelCodes);

  const list = merchantsKeys.map((code, index) => ({
    ...items.parcelCodes[code],
    key: String(index),
  }));

  return sortRow(list, 'externalTrackingCode', Constants.SORTING.DESC, 'string');
};

export const getListByMerchantFromStock = (merchants, selectedItem) => {
  const items = merchants[selectedItem];
  const merchantsKeys = Object.keys(items.parcelCodes);

  const list = merchantsKeys.map((code, index) => ({
    ...items.parcelCodes[code],
    key: String(index),
  }));

  return sortRow(list, 'externalTrackingCode', Constants.SORTING.DESC, 'string');
};


export const getScanned = (merchants, selectedItem, type) => {
  const items = merchants[selectedItem][type];
  const merchantsKeys = Object.keys(items.parcelCodes);
  const list = merchantsKeys.filter(code => items.parcelCodes[code].scanned);
  return list.length;
};

export const getTotal = (merchants, selectedItem, type) => {
  const items = merchants[selectedItem][type];
  const merchantsKeys = Object.keys(items.parcelCodes);
  return merchantsKeys.length;
};

export const getHandlingList = async (type, state = {}) => {
  const wmId = await storageGetItem('wmId');

  /** lista locale con stato di partenza */
  const data = await getAsyncData(Constants.handlingListUrl, {
    wmId: Number(wmId),
    type,
  });

  const checkRes = manageErrors(data);
  if (!checkRes.success) {
    ToastAndroid.showWithGravity(
      checkRes.toastPrimaryText,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
    return ({ isFetching: false });
  }

  // per test: rimettere "await digestParcelsForInbound(Constants.dataDigestParcelsForInbound)"
  let digestData;
  if (type === Constants.localInbound) {
    digestData = await digestParcelsForInbound(data.handlingList.parcels);
  } else {
    digestData = await digestParcelsFromStock(data.handlingList.parcels);
  }
  if (!digestData.success) {
    ToastAndroid.showWithGravity(
      digestData.errorText,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
    return ({
      ...state,
      isFetching: false,
    });
  }
  return ({
    ...state,
    ...digestData,
    wmId,
    isFetching: false,
    planningVersion: data.handlingList.planningVersion,
    handlingListVersion: data.handlingList.handlingListVersion,
  });
};

/**
 * validazione del dato in input
 * */
export const scanHasAValidFormat = async (dataWedge) => {
  const {
    labelType = null,
    data = null,
  } = dataWedge;

  /** se il formato del codice non è valido */
  if (!labelType || !data) {
    throw new Error({ errorText: Constants.notValidScan });
  }
  /** se la tipologia di codice non è accettata */
  if (labelType !== 'LABEL-TYPE-CODE128' && labelType !== 'LABEL-TYPE-EAN128') {
    throw new Error(Constants.notValidScanType);
  }
  /** se è un codice "milkman" (MLK-) */
  if (isMlkCode(data.trim())) {
    return { parcelCode: getMlkCode(data.trim()) };
  }

  return { externalParcelCode: data.trim() };
};

export const executeAndDigestScanning = async (data = {}, sound) => FetchData.post(Constants.scanningUrl, data)
  .then(async (res) => {
    const verifiedResult = await manageErrors(res);
    /** caso di fallimento */
    if (!verifiedResult.success) {
      if (verifiedResult.errorSound) sound.error.play();
      return {
        ...getDefault(data),
        parcelCode: data.parcelCode || data.externalParcelCode,
        message: verifiedResult.toastPrimaryText,
        messageColor: verifiedResult.toastColor,
        merchant: null,
      };
    }

    /** gestione eccezioni ( errors lato BE che voglio gestire come success lato FE ) */
    if (verifiedResult.error) {
      return setMessageForException(res, data, sound, verifiedResult);
    }

    return setMessageForHandlingState(res, sound);
  })
  .catch(e => e);

export const forceInStock = async (
  data = {},
  sound,
) => FetchData.post(Constants.forceInStockUrl, data)
  .then(async (res) => {
    const verifiedResult = await manageErrors(res);
    /** caso di fallimento */
    if (!verifiedResult.success) {
      sound.error.play();
      return {
        ...getDefault(data),
        parcelCode: data.parcelCode || data.externalParcelCode,
        message: verifiedResult.toastPrimaryText,
        messageColor: verifiedResult.toastColor,
        merchant: null,
      };
    }
    /** se errore 1029 non avrò nella res "planningVersion" & "handlingListVersion" */
    const params = {
      ...data,
      ...res.planningVersion && { planningVersion: res.planningVersion },
      ...res.handlingListVersion && { handlingListVersion: res.handlingListVersion },
    };

    return executeAndDigestScanning(params, sound);
  });

export const executeForceInStockOrDoubleScan = async (scan, params, sound) => {
  if (scan.spinner === true) {
    if (scan.forceInStock) {
      return forceInStock(params, sound);
    }

    /** altrimenti applico la doppia scansione */
    return executeAndDigestScanning(params, sound);
  }
};

export const handleScanning = async (data) => {
  const {
    wmId,
    planningVersion,
    handlingListVersion,
    merchants,
    allScanned,
    dataWedge,
    list,
    sound,
  } = data;

  /** verifico che il formato del codice sia valido */
  const validFormat = await scanHasAValidFormat(dataWedge);
  const params = {
    ...validFormat,
    wmId: Number(wmId),
    planningVersion,
    handlingListVersion,
  };
  /** eseguo l'api di scanning */
  let scanning = await executeAndDigestScanning(params, sound);
  /** se il pacco è in stati strani eseguo azioni risolutive */
  if (scanning.spinner === true) {
    scanning = await executeForceInStockOrDoubleScan(scanning, params, sound);
  }
  /** aggiorno le liste e restituisco il risultato */
  return updateAfterScan(scanning, list, merchants, allScanned);
};

export const updateDataAfterScanning = (
  selectedItem,
  parcelCode,
  merchants,
  allScanned,
) => {
  const {
    [selectedItem]: {
      parcelCodes = {},
      externalParcelCodes = {},
    } = {},
  } = merchants;

  let code = parcelCode;

  /** verifico se è un codice di tipo externalParcelCodes */
  if (objectHasKeys(externalParcelCodes) && externalParcelCodes[code]) {
    code = externalParcelCodes[code];
  }

  if (objectHasKeys(parcelCodes) && parcelCodes[code]) {
    /** se non era già scannerizzato aumento il count */
    if (!merchants[selectedItem].parcelCodes[code].scanned) {
      merchants[selectedItem].scanned += 1;
      allScanned += 1;
    }
    merchants[selectedItem].parcelCodes[code].scanned = true;
  }

  return {
    allScanned,
    merchants,
  };
};

export const updateFromStockAfterScan = async (success, merchantsName, oldMerchants, oldAllScanned) => {
  const selectedItem = success.merchant;
  const {
    allScanned,
    merchants,
  } = updateDataAfterScanning(
    selectedItem,
    success.parcelCode,
    oldMerchants,
    oldAllScanned,
  );

  return {
    ...success,
    allScanned,
    merchants,
    list: getFromStockList(merchantsName, merchants),
  };
};

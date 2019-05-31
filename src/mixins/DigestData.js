import Constants from './constants';
import { isMlkCode, getMlkCode } from './Utils';
import Colors from '../assets/colors';
import { checkRes } from './ErrorHandling';
import FetchData from './FetchData';

import {
  getPlanningVersion,
  getHandlingListVersion,
  getRangeTimezone,
  getReturnGoods,
  getPartialDelivery,
  getWfp,
  getToStock,
  getStocked,
  pickupFailed,
  getDefault,
} from './scanResponse';

export const digestParcelsForInbound = (data) => {
  if (!data) {
    return ({
      success: false,
      errorText: Constants.unknownError,
    });
  }

  const merchantsName = [];
  const merchants = {};
  let total = 0;
  let allScanned = 0;

  data.forEach((parcel) => {
    const {
      handlingState,
      nextStatus,
      merchant,
      parcelCode,
      temporaryParcelCode,
      scanned,
    } = parcel;
    if (
      handlingState !== 'Incoming' || (nextStatus !== 'To Load' && nextStatus !== 'In Stock')
    ) {
      return false;
    }
    if (!merchants[merchant]) {
      merchantsName.push(merchant);
      merchants[merchant] = {};
      merchants[merchant]['To Load'] = {};
      merchants[merchant]['To Load'].total = 0;
      merchants[merchant]['To Load'].scanned = 0;
      merchants[merchant]['To Load'].parcelCodes = {};
      merchants[merchant]['To Load'].externalParcelCodes = {};
      merchants[merchant]['In Stock'] = {};
      merchants[merchant]['In Stock'].total = 0;
      merchants[merchant]['In Stock'].scanned = 0;
      merchants[merchant]['In Stock'].parcelCodes = {};
      merchants[merchant]['In Stock'].externalParcelCodes = {};
    }
    total += 1;
    merchants[merchant][nextStatus].total += 1;
    if (scanned) {
      allScanned += 1;
      merchants[merchant][nextStatus].scanned += 1;
    }
    merchants[merchant][nextStatus].parcelCodes = {
      ...merchants[merchant][nextStatus].parcelCodes,
      [parcelCode || temporaryParcelCode]: parcel,
    };

    return true;
  });

  return ({
    success: true,
    merchantsName,
    merchants,
    total,
    allScanned,
  });
};

export const digestParcelsFromStock = async (data) => {
  if (!data) {
    return ({
      success: false,
      errorText: Constants.unknownError,
    });
  }
  const merchantsName = [];
  const merchants = {};
  let total = 0;
  let allScanned = 0;

  data.forEach((parcel) => {
    const {
      handlingState,
      merchant,
      parcelCode,
      externalParcelCode,
      temporaryParcelCode,
      scanned,
    } = parcel;
    if (handlingState !== 'Pull Out') {
      return false;
    }
    if (!merchants[merchant]) {
      merchantsName.push(merchant);
      merchants[merchant] = {};
      merchants[merchant].total = 0;
      merchants[merchant].scanned = 0;
      merchants[merchant].parcelCodes = {};
      merchants[merchant].externalParcelCodes = {};
    }
    merchants[merchant].total += 1;
    total += 1;

    if (scanned) {
      merchants[merchant].scanned += 1;
      allScanned += 1;
    }
    merchants[merchant].parcelCodes = {
      ...merchants[merchant].parcelCodes,
      [parcelCode || temporaryParcelCode]: parcel,
    };

    /** lista di supporto per recuperare il parcelCode in presenza dell'ExternalParcelCode */
    merchants[merchant].externalParcelCodes = {
      ...merchants[merchant].externalParcelCodes,
      [externalParcelCode]: parcelCode || temporaryParcelCode,
    };

    return true;
  });

  return ({
    success: true,
    merchantsName,
    merchants,
    total,
    allScanned,
  });
};

export const checkScan = (dataWedge, success, error) => {
  const {
    labelType = null,
    data = null,
  } = dataWedge;

  if (!labelType || !data) {
    return error(Constants.notValidScan);
  }

  if (labelType !== 'LABEL-TYPE-CODE128' && labelType !== 'LABEL-TYPE-EAN128') {
    return error(Constants.notValidScanType);
  }

  if (isMlkCode(data.trim())) {
    return success({ parcelCode: getMlkCode(data.trim()) });
  }

  return success({ externalParcelCode: data.trim() });
};

export const digestScanInfos = (
  dataWedge = {},
  wmId = null,
  sound,
  success,
  error,
) => {
  checkScan(
    dataWedge,
    data => FetchData.post(Constants.scanningInfosUrl, {
      ...data,
      wmId: Number(wmId),
    })
      .then((res) => {
        checkRes(
          res,
          (resError) => {
            if (resError.errorSound) {
              sound.error.play();
            }

            return success({
              spinner: resError.spinner,
              parcel: data.parcelCode
                ? data.parcelCode
                : data.externalParcelCode,
              merchant: null,
              firstRangeDate: getRangeTimezone(res.firstRange, 'date'),
              firstRangeHours: getRangeTimezone(res.firstRange, 'hhmm'),
              message: resError.toastPrimaryText,
              messageColor: resError.toastColor,
            });
          },
          () => {
            const messageColor = Colors.darkGray1;

            sound.success.play();

            return success({
              parcel: data.parcelCode || data.externalParcelCode,
              merchant: res.merchant,
              message: res.territory,
              firstRangeDate: getRangeTimezone(res.firstRange, 'date'),
              firstRangeHours: getRangeTimezone(res.firstRange, 'hhmm'),
              messageColor,
              spinner: false,
            });
          },
        );
      }),
    (resError) => {
      // console.log('..............resError error ', JSON.stringify(error));
      if (!resError.errorSound) {
        sound.error.play();
      }
      error(resError);
    },
  );
};

/** restituisco il messaggio in caso di pacco trovato */
export const setMessageForHandlingState = async (parcel, sound) => {
  const pv = getPlanningVersion(parcel);
  const hlv = getHandlingListVersion(parcel);

  /** partial delivery */
  if (parcel.orderStatus === Constants.status.fulfilled) {
    sound.warehouse.play();
    return getPartialDelivery(parcel, pv, hlv);
  }

  /** return goods */
  if (parcel.orderStatus === Constants.status.failed
    || parcel.deliveryContentType === Constants.deliveryContentType.return) {
    sound.warehouse.play();
    return getReturnGoods(parcel, pv, hlv);
  }

  /** force in stock */
  const toForceInStock = parcel.status === Constants.status.inTransit;
  if (toForceInStock) {
    sound.warehouse.play();
    return {
      ...getToStock(parcel),
      spinner: toForceInStock,
      forceInStock: toForceInStock,
      message: parcel.handlingState === Constants.handlingState.stocked
        ? Constants.messageStocked
        : Constants.messageToStock,
      messageColor: Colors.darkenTiffany,
      parcelCode: parcel.parcelCode || parcel.externalParcelCode,
    };
  }
  switch (parcel.nextHandlingState) {
    case Constants.handlingState.wfp: {
      sound.success.play();
      return getWfp(parcel, pv, hlv);
    }
    case Constants.handlingState.toStock: {
      sound.warehouse.play();
      return getToStock(parcel, pv, hlv);
    }
    case Constants.handlingState.stocked: {
      sound.warehouse.play();
      return getStocked(parcel, pv, hlv);
    }
    case Constants.handlingState.pickupFailed: {
      sound.warehouse.play();
      return pickupFailed(parcel, pv, hlv);
    }
    default: {
      sound.error.play();
      return getDefault(parcel, pv, hlv);
    }
  }
};
/** occhio ai casi particolari: 1053, 1054: errore perchè pacco già scansionato */
export const setMessageForException = async (parcel, data, sound, res) => {
  const message = parcel.actionMessage
    ? parcel.actionMessage
    : parcel.lastActionMessage;

  /** partial delivery */
  if (parcel.orderStatus === Constants.status.fulfilled) {
    sound.warehouse.play();
    return getPartialDelivery(parcel);
  }

  /** return goods */
  if (parcel.orderStatus === Constants.status.failed
    || parcel.deliveryContentType === Constants.deliveryContentType.return) {
    sound.warehouse.play();
    return {
      ...getReturnGoods(parcel),
      parcelCode: data.parcelCode || data.externalParcelCode,
      externalParcelCode: parcel.externalParcelCode || null,
    };
  }

  /** force in stock */
  const toForceInStock = parcel.status === Constants.status.inTransit;
  if (toForceInStock) {
    sound.warehouse.play();
    return {
      ...getToStock(parcel),
      spinner: toForceInStock,
      forceInStock: toForceInStock,
      message: parcel.handlingState === Constants.handlingState.stocked
        ? Constants.messageStocked
        : Constants.messageToStock,
      messageColor: Colors.darkGray1,
      parcelCode: data.parcelCode || data.externalParcelCode,
    };
  }
  switch (String(parcel.error)) {
    case '1083': {
      const {
        details: {
          territory: {
            found = null,
          } = {},
        } = {},
      } = res;
      sound.error.play();
      return {
        loadingArea: null,
        position: null,
        totPosition: null,
        spinner: false,
        message: `${Constants.territoryError}, ${found}`,
        messageColor: Colors.pink,
        errorSound: true,
        parcelCode: data.parcelCode || data.externalParcelCode,
      };
    }
    case '1053': {
      return {
        ...getToStock(parcel),
        spinner: false,
        message: parcel.handlingState === Constants.handlingState.stocked
          ? Constants.messageStocked
          : Constants.messageToStock,
        messageColor: Colors.darkGray1,
        parcelCode: data.parcelCode || data.externalParcelCode,
      };
    }
    case '1054': {
      sound.success.play();
      return {
        ...getWfp(parcel),
        message: parcel.driver
          ? parcel.driver
          : Constants.messageRequestPlanningInfo,
        parcelCode: data.parcelCode || data.externalParcelCode,
      };
    }
    default: {
      return {
        ...getDefault(parcel),
        parcelCode: data.parcelCode || data.externalParcelCode,
        message,
      };
    }
  }
};

// pacco app che faceva crashare
// let parcel = {
//   "nextHandlingState" : "To Stock",
//   "handlingListVersion" : 2678,
//   "nextStatus" : "In Stock",
//   "success" : true,
//   "status" : "Waiting For Arrival",
//   "actionMessage" : "Preparare in giacenza",
//   "parcelCode" : "01154723",
//   "temporaryParcelCode" : "02128186",
//   "planningVersion" : 1,
//   "handlingState" : "Incoming",
// };
export const scanning = (
  data = {},
  sound,
  success,
) => FetchData.post(Constants.scanningUrl, data)
  .then((res) => {
    checkRes(
      res,
      (resError) => {
        // console.log('..............checkRes resError error ', JSON.stringify(resError));
        if (resError.errorSound) {
          sound.error.play();
        }
        return success({
          ...getDefault(data),
          parcelCode: data.parcelCode || data.externalParcelCode,
          message: resError.toastPrimaryText,
          messageColor: resError.toastColor,
          merchant: null,
        });
      },
      resSuccess => (res.error
        ? success(setMessageForException(res, data, sound, resSuccess))
        : success(setMessageForHandlingState(res, sound))),
    );
  });

/** filesBase64 */
export const createFileBase64 = (name, base64, sound, success, error) => FetchData
  .post(`${Constants.base64DataUrl}/${name}`, base64)
  .then(res => checkRes(
    res,
    (resError) => {
      sound.error.play();
      error(resError);
    },
    (resSuccess) => {
      sound.success.play();
      success({ url: resSuccess.url });
    }
  ));

/** createParcel */
export const createParcel = (data = {}, sound, success, error) => FetchData
  .post(Constants.createParcelUrl, data)
  .then(res => checkRes(
    res,
    (resError) => {
      sound.error.play();
      error(resError);
    },
    () => {
      sound.success.play();
      success();
    },
  ));

/** unknownParcel */
export const unknownParcel = (
  data = {},
  sound,
  success,
  error,
) => FetchData.post(Constants.unknownParcelUrl, data)
  .then(res => checkRes(
    res,
    (resError) => {
      sound.error.play();
      error({
        spinner: false,
        message: resError.toastPrimaryText,
        messageColor: resError.toastColor,
      });
    },
    () => {
      sound.success.play();
      success({
        spinner: false,
      });
    },
  ));
export const forceInStock = (
  data = {},
  sound,
  success,
) => FetchData.post(Constants.forceInStockUrl, data)
  .then(res => checkRes(
    res,
    (resError) => {
      sound.error.play();
      success({
        ...getDefault(data),
        parcelCode: data.parcelCode || data.externalParcelCode,
        message: resError.toastPrimaryText,
        messageColor: resError.toastColor,
        merchant: null,
      });
    },
    () => scanning(data, sound, success),
  ));

export const digestScan = (
  dataWedge = {},
  wmId = null,
  planningVersion = null,
  handlingListVersion = null,
  sound,
  success,
  error,
) => {
  checkScan(
    dataWedge,
    data => scanning(
      {
        ...data,
        wmId: Number(wmId),
        planningVersion,
        handlingListVersion,
      },
      sound,
      success,
    ),
    (resError) => {
      if (!resError.errorSound) {
        sound.error.play();
      }

      error(resError);
    },
  );
};

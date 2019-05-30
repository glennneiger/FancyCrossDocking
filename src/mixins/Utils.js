import AsyncStorage from '@react-native-community/async-storage';
import { ToastAndroid } from 'react-native';
import FetchData from './FetchData';
import { getDataVersion, notObjEmpty } from './UtilsFn';
import Constants from './constants';

export const stopDispatch = () => {
  Constants.dispatching = '';
};

export const dispatch = (url) => {
  Constants.dispatching = url;
};

export const isFetching = url => Constants.dispatching === url;

export const storageSetItem = (itemName, itemValue) => AsyncStorage.setItem(itemName, itemValue);

export const storageGetItem = itemName => AsyncStorage.getItem(itemName);

export const getData = (url, data) => FetchData.get(FetchData.composeUrl(url, data));

export const isMlkCode = (code) => {
  const idMlkCode = String(code).replace(/\s/g, '').substr(0, 4);
  return idMlkCode === 'MLK-';
};

export const getMlkCode = code => (isMlkCode(code)
  ? String(code).replace(/\s/g, '').substr(4) : String(code).replace(/\s/g, ''));

export const objectHasKeys = (obj) => {
  const keys = Object.keys(obj);

  return keys.length !== 0;
};

export const isValidNumber = val => !Number.isNaN(parseFloat(val)) && Number.isFinite(val);

export const getOptions = (error, success) => {
  storageGetItem('wmId').then((wmId) => {
    if (wmId === null || !isValidNumber(Number(wmId))) {
      error('wmId');
    }
    storageGetItem('planningVersion').then((planningVersion) => {
      storageGetItem('handlingListVersion').then((handlingListVersion) => {
        if (
          !isValidNumber(Number(planningVersion))
          || !isValidNumber(Number(handlingListVersion))
        ) {
          return getDataVersion(
            Number(wmId),
            e => error('planningVersion'),
            res => success({
              wmId: Number(wmId),
              planningVersion: Number(res.planningVersion),
              handlingListVersion: Number(res.handlingListVersion),
            }),
          );
        }

        return success({
          wmId: Number(wmId),
          planningVersion: Number(planningVersion),
          handlingListVersion: Number(handlingListVersion),
        });
      });
    });
  });
};

export const showError = error => ToastAndroid.showWithGravity(
  error,
  ToastAndroid.SHORT,
  ToastAndroid.CENTER,
);

export const sortRow = (
  records,
  sortedBy,
  sortedType,
  dataType,
) => {
  function compare(a, b) {
    let keyA; let
      keyB;

    switch (dataType) {
      case 'datetime':
      case 'range':
      case 'string':
        if (a[sortedBy] === undefined || a[sortedBy] === null) return 1;
        if (b[sortedBy] === undefined || b[sortedBy] === null) return -1;/** gestisco il caso del nullo */

        keyA = String(a[sortedBy]).toLowerCase();
        keyB = String(b[sortedBy]).toLowerCase();

        if (keyA < keyB) return sortedType === Constants.SORTING.DESC ? -1 : 1;
        if (keyA > keyB) return sortedType === Constants.SORTING.DESC ? 1 : -1;
        return 0;
      case 'number':
        if (a[sortedBy] === undefined || a[sortedBy] === null) return 1;/** gestisco il caso del nullo */
        if (b[sortedBy] === undefined || b[sortedBy] === null) return -1;

        keyA = Number(a[sortedBy]);
        keyB = Number(b[sortedBy]);

        if (keyA < keyB) return sortedType === Constants.SORTING.DESC ? -1 : 1;
        if (keyA > keyB) return sortedType === Constants.SORTING.DESC ? 1 : -1;
        return 0;
      default:
        return 0;
    }
  }

  return records.sort(compare);
};

export const notScanned = (status, list, merchants, merchant, parcelCode) => {
  // devo incrementare il valore di scanning
  const newList = list.map((i) => {
    if (i.label === merchant) {
      return {
        ...i,
        ...status === 'In Stock' && { stockScanned: i.stockScanned + 1 },
        ...status === 'To Load' && { bayScanned: i.bayScanned + 1 },
      };
    }
    return i;
  });
  // e aggiornare la lista
  const newStockParcel = {
    ...merchants,
    [merchant]: {
      ...merchants[merchant],
      [status]: {
        ...merchants[merchant][status],
        scanned: merchants[merchant][status].scanned + 1,
        parcelCodes: {
          ...merchants[merchant][status].parcelCodes,
          [parcelCode]: {
            ...merchants[merchant][status].parcelCodes[parcelCode],
            scanned: true,
          },
        },
      },
    },
  };

  return {
    merchants: newStockParcel,
    list: newList,
  };
};

export const updateAfterScan = async (data, list, merchants, allScanned) => {
  if (merchants
    && merchants[data.merchant]
    && (merchants[data.merchant]['In Stock'] || merchants[data.merchant]['To Load'])
  ) {
    const inStockParcel = merchants[data.merchant]['In Stock'].parcelCodes;
    const toLoadParcel = merchants[data.merchant]['To Load'].parcelCodes;

    if (notObjEmpty(inStockParcel) && inStockParcel[data.parcelCode]) {
      // se non è già stato scansionato in precedenza aggiorno i dati
      if (!inStockParcel[data.parcelCode].scanned) {
        const newState = notScanned(
          'In Stock',
          list,
          merchants,
          data.merchant,
          data.parcelCode,
        );
        return {
          ...data,
          ...newState,
          allScanned: allScanned + 1,
        };
      }
    }
    if (notObjEmpty(toLoadParcel) && toLoadParcel[data.parcelCode]) {
      // se non è già stato scansionato in precedenza aggiorno i dati
      if (!toLoadParcel[data.parcelCode].scanned) {
        const newState = notScanned(
          'To Load',
          list,
          merchants,
          data.merchant,
          data.parcelCode,
        );
        return {
          ...data,
          ...newState,
          allScanned: allScanned + 1,
        };
      }
    }
  }

  return {
    ...data,
  };
};


// export const updateFromStockAfterScan = async (success, merchantsName) => {
//   const selectedItem = success.merchant;
//   const {
//     allScanned,
//     merchants,
//   } = updateDataAfterScanning(
//     selectedItem,
//     success.parcelCode,
//     this.state.merchants,
//     this.state.allScanned,
//   );
//
//   return {
//     ...success,
//     allScanned,
//     merchants,
//     list: getFromStockList(merchantsName, merchants),
//   };
// };

// export const scanHandler = (data, success, error) => {
//   const {
//     wmId,
//     planningVersion,
//     handlingListVersion,
//     sound,
//     dataWedge = {},
//   } = data;
//   digestScan(
//     dataWedge,
//     wmId,
//     planningVersion,
//     handlingListVersion,
//     sound,
//     (s) => {
//       if (s.spinner === true) {
//         const res = {
//           wmId: Number(wmId),
//           planningVersion,
//           handlingListVersion,
//         };
//         if (s.externalParcelCode) {
//           res.externalParcelCode = s.externalParcelCode;
//         } else {
//           res.parcelCode = s.parcelCode;
//         }
//         if (s.forceInStock) {
//           forceInStock(
//             res,
//             sound,
//             succ => success(succ),
//           );
//         }
//
//         /** altrimenti applico la doppia scansione */
//         scanning(
//           res,
//           sound,
//           succ => success(succ),
//         );
//       }
//       success(s);
//     },
//     e => error(e),
//   );
// };


// export function manageScan(data = {}, success, error) {
//   const {
//     dataWedge,
//     wmId,
//     planningVersion,
//     handlingListVersion,
//     merchants,
//     list,
//     allScanned,
//     sound,
//   } = data;
//
//   scanHandler({
//     dataWedge,
//     wmId,
//     planningVersion,
//     handlingListVersion,
//     sound,
//   }, async (s) => {
//     const res = await updateAfterScan(s, list, merchants, allScanned);
//     success(res);
//   },
//   e => error(e));
// }
//
// export function manageFromStockScan(data = {}, success, error) {
//   const {
//     dataWedge,
//     wmId,
//     planningVersion,
//     handlingListVersion,
//     merchants,
//     list,
//     allScanned,
//     sound,
//   } = data;
//
//   return scanHandler({
//     dataWedge,
//     wmId,
//     planningVersion,
//     handlingListVersion,
//     sound,
//   }, async (s) => {
//     const res = await updateFromStockAfterScan(s, list, merchants, allScanned);
//     success(res);
//   },
//   e => error(e));
// }

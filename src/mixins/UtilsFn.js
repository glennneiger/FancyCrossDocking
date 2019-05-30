import Const from './constants';
import {
  getData, isValidNumber, storageGetItem, storageSetItem,
} from './Utils';
import { checkRes } from './ErrorHandling';

/**
 * working with scan
 * */
const isMilkmanCode = (code) => {
  const idMlkCode = String(code).replace(/\s/g, '').substr(0, 4);
  return idMlkCode === 'MLK-';
};

export const getMilkmanCode = code => (isMilkmanCode(code)
  ? String(code).replace(/\s/g, '').substr(4)
  : String(code).replace(/\s/g, ''));


export const getDataVersion = (wmId, error, success) => {
  getData(Const.versionUrl, { wmId })
    .then((version) => {
      checkRes(
        version,
        e => error(e),
        () => {
          storageSetItem('handlingListVersion', String(version.handlingListVersion));
          storageSetItem('planningVersion', String(version.planningVersion));
          success(version);
        },
      );
    });
};

export const checkCode128 = (deviceEvent, data, success) => {
  data.parcelCode = getMilkmanCode(deviceEvent.data);

  return success({ data });
};

export const checkCode128OnlyMilkmanCode = (deviceEvent, data, success, error) => {
  if (!isMilkmanCode(deviceEvent.data)) {
    return error({
      openErrorToast: true,
      toastPrimaryText: Const.unknownCode,
    });
  }

  data.parcelCode = getMilkmanCode(deviceEvent.data);

  return success({ data });
};

export const checkQRCode = (deviceEvent, data, success, error) => {
  const parsedData = JSON.parse(deviceEvent.data);

  if (!parsedData.milkmanTrackingCode) {
    return error({
      openErrorToast: true,
      toastPrimaryText: Const.unknownQRCode,
    });
  }

  return success({
    data: {
      parcelCode: parsedData.milkmanTrackingCode,
      ...data,
    },
  });
};

export const checkDataMatrix = (deviceEvent, data, success) => {
  data.parcelCode = deviceEvent.data.trim();

  return success({ data });
};

export const getLogTimestamp = () => {
  const d = new Date();

  return `${addZero(d.getHours())}:${
    addZero(d.getMinutes())}:${
    addZero(d.getSeconds())}:${
    addZero(d.getMilliseconds())}`;
};

/**
 * working with CONST to FetchData
 * */
export const getHandlingListType = (section) => {
  switch (section) {
    case Const.inbound:
      return 'inbound';
    case Const.fromStock:
      return 'fromStock';
    case Const.toStock:
      return 'toStock';
  }
};

/**
 * check data
 * */
export const isEmpty = obj => Object.keys(obj).length === 0;

export const notObjEmpty = obj => Object.keys(obj).length;

export const includeItem = (listToCheck, item) => listToCheck.includes(item);

export const addItem = (item, list) => [item, ...list];

export const removeItem = (list, index) => {
  if (list.length > 1) {
    if (index === 0) {
      return [
        ...list.slice(1),
      ];
    }

    return [
      ...list.slice(0, index),
      ...list.slice(index + 1),
    ];
  }

  return [];
};

export const addZero = (i) => {
  if (i < 10) {
    i = `0${i}`;
  }
  return i;
};

/**
 * se l'ora locale � 23:59 ritorno true. questo mi serve per forzare il logout a fine giornata
 * */
export const checkTimezone = () => {
  const options = {
    timeZone: Const.timeZone,
    timeZoneName: 'short',
  };

  const tz = new Date().toLocaleString(Const.dateTime, options);
  const localTime = tz.split(' ')[3];

  return localTime.split(':')[0] === '23' && localTime.split(':')[1] === '59';
};

export const checkDateToday = (date) => {
  const today = new Date();
  return today.toLocaleDateString() === date;
};

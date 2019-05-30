import Colors from '../assets/colors';
import Constants from './constants';

export const getMessage = (data, res) => {
  switch (data) {
    case 0:
      return {
        success: false,
        spinner: false,
        toastPrimaryText: Constants.noServerResponse,
        toastColor: Colors.pink,
        errorSound: true,
      };
    case 1:
      return {
        success: false,
        spinner: true,
        toastColor: Colors.darkGray1,
        errorSound: false,
      };
    case 6:
      return {
        spinner: false,
        toastPrimaryText: Constants.failedLogin,
        toastColor: Colors.pink,
        errorSound: true,
      };
    case 1041:
      return {
        success: false,
        spinner: false,
        toastPrimaryText: Constants.unknownCode,
        toastColor: Colors.pink,
        errorSound: true,
      };
    case 1042:
      return {
        success: false,
        spinner: false,
        toastPrimaryText: Constants.userNotFound,
        toastColor: Colors.pink,
        errorSound: true,
      };
    case 1043:
      return {
        success: false,
        spinner: false,
        toastPrimaryText: Constants.tooManyParcels,
        toastColor: Colors.pink,
        errorSound: true,
      };
    case 1142:
      return {
        success: false,
        spinner: false,
        toastPrimaryText: Constants.merchantNotFound,
        toastColor: Colors.pink,
        errorSound: true,
      };
    case 1051:
      return {
        success: false,
        spinner: false,
        toastPrimaryText: Constants.parcelCodeAlreadyInUse,
        toastColor: Colors.pink,
        errorSound: true,
      };
    case 1083:
      const {
        details: {
          territory: {
            found = null,
          } = {},
        } = {},
      } = res;
      return {
        success: false,
        spinner: false,
        toastPrimaryText: `${Constants.territoryError}, ${found}`,
        toastColor: Colors.darkGray1,
        errorSound: true,
      };
    default:
      return {
        success: false,
        spinner: false,
        toastPrimaryText: Constants.unknownError,
        toastColor: Colors.pink,
        errorSound: true,
      };
  }
};

/**
 * questi non vanno gestiti come errori
 * 1054 - Pickup failed not available: il pacco è già stato scansionato, non verrà passato ad un altro stato
 * (tipo giacenza) perchè in realtà deve uscire con un autista
 *
 * 1029 : Too many requests
 *
 * 1053 - Parcel already scanned: il pacco è già stato scansionato
 *
 * 1083 - error on territory
 *
 * */
export const checkRes = (res, error, success) => {
  res.success
  || res.error === 1029
  || res.error === 1053
  || res.error === 1054
  || res.error === 1083 ? success(res) : error(getMessage(res.error, res));
};

export const manageErrors = (res) => {
  if (
    res.success
    || res.error === 1029
    || res.error === 1053
    || res.error === 1054
    || res.error === 1083
  ) {
    return {
      ...res,
      success: true,
    };
  }

  return getMessage(res.error, res);
};

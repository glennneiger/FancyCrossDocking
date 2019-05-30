import moment from 'moment';
import MomentTz from 'moment-timezone';
import Constants from './constants';
import Colors from '../assets/colors';

export const getISOFormat = (date, format) => moment(date)
  .format(format);

export const getRangeTimezone = (range, format) => {
  if (!range) {
    return null;
  }

  const d1 = MomentTz(range.split('/')[0]).tz(Constants.timezone);
  const d2 = MomentTz(range.split('/')[1]).tz(Constants.timezone);

  switch (format) {
    case 'date':
      return getISOFormat(d1, Constants.date);
    case 'hhmm':
      return `${getISOFormat(d1, Constants.hhmm)} ${String.fromCharCode(47)} ${
        getISOFormat(d2, Constants.hhmm)}`;
    default:
      return null;
  }
};

export const getPlanningVersion = parcel => (parcel.planningVersion
  ? { planningVersion: parcel.planningVersion }
  : {});

export const getHandlingListVersion = parcel => (parcel.handlingListVersion
  ? { handlingListVersion: parcel.handlingListVersion }
  : {});

export const getPartialDelivery = (parcel, planningVersion = {}, handlingListVersion = {}) => ({
  ...planningVersion,
  ...handlingListVersion,
  message: Constants.messagePartialDelivery,
  messageColor: Colors.darkenTiffany,
  merchant: parcel.merchant || null,
  parcelCode: parcel.parcelCode || parcel.externalParcelCode,
  firstRangeDate: getRangeTimezone(parcel.firstRange, 'date'),
  firstRangeHours: getRangeTimezone(parcel.firstRange, 'hhmm'),
  loadingArea: null,
  position: null,
  totPosition: null,
  spinner: false,
});

export const getReturnGoods = (parcel, planningVersion = {}, handlingListVersion = {}) => ({
  ...planningVersion,
  ...handlingListVersion,
  message: Constants.messageReturnGoods,
  messageColor: Colors.darkenTiffany,
  merchant: parcel.merchant || null,
  parcelCode: parcel.parcelCode || parcel.externalParcelCode,
  firstRangeDate: getRangeTimezone(parcel.firstRange, 'date'),
  firstRangeHours: getRangeTimezone(parcel.firstRange, 'hhmm'),
  loadingArea: null,
  position: null,
  totPosition: null,
  spinner: false,
});

export const getWfp = (parcel, planningVersion = {}, handlingListVersion = {}) => {
  let {
    position = null,
    totPosition = null,
  } = parcel;

  if (position) {
    position = position.toString().length === 1
      ? `0${position}`
      : position;
  }
  if (totPosition) {
    totPosition = totPosition.toString().length === 1
      ? `0${totPosition}`
      : totPosition;
  }

  return {
    ...planningVersion,
    ...handlingListVersion,
    message: parcel.driver || Constants.messageRequestPlanningInfo,
    messageColor: Colors.darkenTiffany,
    firstRangeDate: getRangeTimezone(parcel.firstRange, 'date'),
    firstRangeHours: getRangeTimezone(parcel.firstRange, 'hhmm'),
    loadingArea: parcel.loadingArea.substring(3) || null,
    merchant: parcel.merchant || null,
    parcelCode: parcel.parcelCode || parcel.externalParcelCode,
    position: position || null,
    totPosition: totPosition || null,
    spinner: false,
  };
};

export const getToStock = (parcel, planningVersion = {}, handlingListVersion = {}) => ({
  ...planningVersion,
  ...handlingListVersion,
  spinner: true,
  message: Constants.messageToStock,
  messageColor: Colors.darkenTiffany,
  firstRangeDate: getRangeTimezone(parcel.firstRange, 'date'),
  firstRangeHours: getRangeTimezone(parcel.firstRange, 'hhmm'),
  merchant: parcel.merchant || null,
  parcelCode: parcel.parcelCode || parcel.externalParcelCode,
  externalParcelCode: parcel.externalParcelCode || null,
  loadingArea: null,
  position: null,
  totPosition: null,
});

export const getStocked = (parcel, planningVersion = {}, handlingListVersion = {}) => ({
  ...planningVersion,
  ...handlingListVersion,
  message: Constants.messageStocked,
  messageColor: Colors.darkGray1,
  firstRangeDate: getRangeTimezone(parcel.firstRange, 'date'),
  firstRangeHours: getRangeTimezone(parcel.firstRange, 'hhmm'),
  merchant: parcel.merchant || null,
  parcelCode: parcel.parcelCode || parcel.externalParcelCode,
  loadingArea: null,
  position: null,
  totPosition: null,
  spinner: false,
});

export const pickupFailed = (parcel, planningVersion = {}, handlingListVersion = {}) => ({
  ...planningVersion,
  ...handlingListVersion,
  spinner: true,
  message: Constants.messageToStock,
  messageColor: Colors.darkenTiffany,
  firstRangeDate: getRangeTimezone(parcel.firstRange, 'date'),
  firstRangeHours: getRangeTimezone(parcel.firstRange, 'hhmm'),
  merchant: parcel.merchant || null,
  parcelCode: parcel.parcelCode || parcel.externalParcelCode,
  loadingArea: null,
  position: null,
  totPosition: null,
});

export const getDefault = (parcel, planningVersion = {}, handlingListVersion = {}) => ({
  ...planningVersion,
  ...handlingListVersion,
  spinner: false,
  message: null,
  messageColor: Colors.darkenTiffany,
  merchant: parcel.merchant || null,
  firstRangeDate: null,
  firstRangeHours: null,
  loadingArea: null,
  parcelCode: null,
  position: null,
  totPosition: null,
});

import { REACT_APP_VERSION, APP_ENV, BASE_URL } from 'react-native-dotenv';
// import { REACT_APP_VERSION, BASE_URL, APP_ENV } from 'react-native-dotenv';
import Colors from '../assets/colors';

// const BASE_URL = 'https://dev.api.milkman.it/crossDockApp';

export default {
  version: REACT_APP_VERSION,
  // loginColor: Colors.violet,
  loginColor: APP_ENV === 'prod' ? Colors.darkenTiffany : Colors.violet,
  logsReport: [],
  dispatching: '',
  routeName: {
    login: 'Login',
    scanning: 'Scanning',
    hub: 'Scan Hub',
    inbound: 'Scan Inbound',
    manual: 'Scan Info',
    inboundList: 'List Inbound',
    inboundDetails: 'Inbound Details',
    fromStock: 'From Stock',
    fromStockList: 'List From Stock',
    fromStockDetails: 'From Stock Details',
    assignParcel: 'Assign Parcel',
    toStock: 'To Stock',
    unknownParcel: 'Unknown Parcels',
    unknownParcelStep0: 'Unknown Parcels 1/4',
    unknownParcelStep1: 'Unknown Parcels 2/4',
    unknownParcelStep2: 'Unknown Parcels 3/4',
    unknownParcelStep3: 'Unknown Parcels 4/4',
    createParcel: 'Create Parcel',
    createParcelStep0: 'Create Parcel 1/5',
    createParcelStep1: 'Create Parcel 2/5',
    createParcelStep2: 'Create Parcel 3/5',
    createParcelStep3: 'Create Parcel 4/5',
    createParcelStep4: 'Create Parcel 5/5',
    scanCamera: 'Scansiona Codice',
  },
  status: {
    inTransit: 'In Transit',
    failed: 'Failed',
    deleted: 'Deleted',
    fulfilled: 'Fulfilled',
  },
  handlingState: {
    incoming: 'Incoming',
    stocked: 'Stocked',
    toStock: 'To Stock',
    wfp: 'Waiting For Pickup',
    pullOut: 'Pull Out',
    pickupFailed: 'Pickup Failed',
  },
  fromStock: 'stock',
  inbound: 'inbound',
  localInbound: 'localInbound',
  /** errori */
  messageShotParcel: 'Fotografa il codice del pacco',
  subMessageShotParcel: 'Assicurati che il codice sia ben visibile.',
  messagePartialDelivery: `Consegna gi${String.fromCharCode(224)} effettuata - Metti in giacenza`,
  messageReturnGoods: 'Rendi al mittente',
  notFoundScanAgain: 'Non trovato, scansiona di nuovo',
  tooManyParcels: 'Pacco non trovato, codice ambiguo',
  scanMilkmanCode: 'Scansiona etichetta Milkman da associare',
  messageRequestPlanningInfo: 'Richiedere verifica pianificazione',
  messageToStock: 'Preparare in giacenza',
  messageStocked: 'Caricato in giacenza',
  unknownCode: 'Codice non trovato',
  unknownParcel: 'Pacco non trovato',
  failedLogin: 'Autenticazione fallita',
  userNotFound: 'Operatore non trovato',
  merchantNotFound: 'Merchant non trovato',
  territoryError: 'Attenzione: pacco per altro territorio',
  unknownQRCode: 'Codice non trovato, QR code errato',
  noPVHLV: 'Ricarica la pagina, ci sono problemi di connessione',
  noParcelsToScan: 'Non ci sono pacchi da scansionare',
  noServerResponse: 'Scansiona di nuovo, ci sono problemi di connessione',
  notValidScan: 'Codice non valido',
  notValidScanType: 'Formato del codice non valido',
  parcelAlreadyScanned: 'Scannerizzato di recente',
  scanningNotAvailable: `Non ${String.fromCharCode(232)} possibile scansionare`,
  scanningAvailable: 'Puoi iniziare a scansionare',
  manualScanAvailable: 'Inserisci il codice pacco che non risulta leggibile',
  unknownError: `Qualcosa ${String.fromCharCode(232)} andato storto`,
  parcelCodeAlreadyInUse: `Codice pacco gi${String.fromCharCode(224)} in uso`,
  /** URL */
  parcelUrl: `${BASE_URL}/parcel`,
  searchOrderUrl: `${BASE_URL}/searchOrder`,
  parcelOrderAssignmentUrl: `${BASE_URL}/parcelOrderAssignment`,
  versionUrl: `${BASE_URL}/version`,
  handlingListUpdatesUrl: `${BASE_URL}/handlingListUpdates`,
  scanningUrl: `${BASE_URL}/scanning`,
  scanningInfosUrl: `${BASE_URL}/scanningInfos`,
  forceInStockUrl: `${BASE_URL}/forceInStock`,
  merchantUrl: `${BASE_URL}/merchant`,
  milknamesUrl: `${BASE_URL}/milknames`,
  loginUrl: `${BASE_URL}/login`,
  handlingListUrl: `${BASE_URL}/handlingList`,
  closeHandlingUrl: `${BASE_URL}/closeHandling`,
  unknownCodeUrl: `${BASE_URL}/unknownCode`,
  binaryDataUrl: `${BASE_URL}/files`,
  base64DataUrl: `${BASE_URL}/filesBase64`,
  createParcelUrl: `${BASE_URL}/createParcel`,
  unknownParcelUrl: `${BASE_URL}/unknownParcel`,
  /** ORIENTATION */
  orientation: {
    portrait: 'portrait',
    landscape: 'landscape'
  },
  /** NAV BAR TYPE */
  navBarType: {
    openDrawer: 'open-drawer',
    goBack: 'go-back',
    noAction: 'no-action'
  },
  /** TIMEZONE */
  dateTime: 'it-RM',
  timezone: 'Europe/Rome',
  date: 'YYYY-MM-DD',
  hhmm: 'HH:mm',
  /** test */
  username: 'francesca',
  password: 'francesca',
  SORTING: {
    ASC: 'ASC',
    DESC: 'DESC',
  },
  // dataDigestParcelsForInbound: [{
  //   nextHandlingState: 'Waiting For Pickup',
  //   consigneeLastName: 'Barbazeni',
  //   orderType: 'Timedefined',
  //   nextStatus: 'To Load',
  //   handlingListType: 'Inbound',
  //   externalParcelCode: '32491692',
  //   consigneeFirstName: 'Francesca',
  //   loadingArea: 'BC.03',
  //   weight: 1.0,
  //   status: 'Waiting For Arrival',
  //   externalTrackingCode: '68729299',
  //   parcelCode: '02032554',
  //   position: 5,
  //   driver: 'Marco Perini',
  //   temporaryParcelCode: '02033464',
  //   totPosition: 11,
  //   merchant: 'Gallo',
  //   handlingState: 'Incoming',
  //   scanned: false,
  // }, {
  //   nextHandlingState: 'Stocked',
  //   consigneeLastName: 'Barbazeni',
  //   orderType: 'Timedefined',
  //   nextStatus: 'In Stock',
  //   longestSide: 11.0,
  //   handlingListType: 'Inbound',
  //   volume: 10.0,
  //   externalParcelCode: '96431520',
  //   consigneeFirstName: 'Francesca',
  //   weight: 1.0,
  //   status: 'Waiting For Arrival',
  //   externalTrackingCode: '78597166',
  //   parcelCode: '02032257',
  //   temporaryParcelCode: '02033159',
  //   merchant: 'Gallo',
  //   handlingState: 'Incoming',
  //   scanned: false,
  // }, {
  //   nextHandlingState: 'Waiting For Pickup',
  //   consigneeLastName: 'Barbazeni',
  //   orderType: 'Timedefined',
  //   nextStatus: 'To Load',
  //   handlingListType: 'Inbound',
  //   externalParcelCode: '79828173',
  //   consigneeFirstName: 'Francesca',
  //   loadingArea: 'BC.02',
  //   weight: 1.0,
  //   status: 'Waiting For Arrival',
  //   externalTrackingCode: '21569724',
  //   parcelCode: '02032280',
  //   temporaryParcelCode: '02033176',
  //   merchant: 'Gallo',
  //   handlingState: 'Incoming',
  //   scanned: false,
  // }],
};

import React, { Component } from 'react';

/** components */
import List from '../../../components/List';

/** mixins */
import Const from '../../../mixins/constants';

import {
  getListByMerchantFromStock, getHandlingList, handleScanning, updateFromStockAfterScan,
} from '../../../mixins/AsyncUtils';
import { showError } from '../../../mixins/Utils';

/** assets */
import Colors from '../../../assets/colors';
import PhotoGalleryWithDetails from '../../../components/photos/PhotoGalleryWithDetails';

export default class ContainerDetails extends Component {
  constructor(props) {
    super(props);
    this.navigateBack = this.navigateBack.bind(this);

    /* recupero parametri passati dalla lista */
    const {
      params: {
        merchants = {},
        selectedItem = null,
        total = null,
        scanned = null,
        wmId = null,
        planningVersion = null,
        handlingListVersion = null,
        allScanned = null,
      } = {},
    } = props.navigation.state;

    const list = getListByMerchantFromStock(merchants, selectedItem);

    /* set state */
    this.state = {
      merchants,
      selectedItem,
      total,
      scanned,
      wmId,
      list,
      planningVersion,
      handlingListVersion,
      allScanned,
      refreshing: false,
      spinner: false,
      dataWedge: props.screenProps ? props.screenProps.dataWedge : null,
      parcelCode: null,
      merchant: null,
      position: null,
      totPosition: null,
      loadingArea: null,
      message: Const.scanningAvailable,
      messageColor: Colors.lightLightTiffany,
      detailsOpen: false,
      detailsPhotos: [],
      detailsFirstScan: null,
      detailsLastScan: null
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const isFocused = nextProps.navigation.isFocused();

    if (isFocused && nextProps.screenProps.dataWedge !== prevState.dataWedge) {
      return {
        // spinner: true,
        dataWedge: nextProps.screenProps.dataWedge,
        message: !prevState.dataWedge ? Const.scanningAvailable : null,
        parcelCode: null,
        position: null,
        totPosition: null,
      };
    }
    return null;
  }

  /** se lo state del dataWedge è cambiato verifico i dati scannerizzati */
  componentDidUpdate(prevProps, prevState) {
    const {
      wmId,
      planningVersion,
      handlingListVersion,
      dataWedge,
      merchantsName,
      merchants,
      allScanned,
    } = this.state;
    const {
      sound,
    } = this.props.screenProps;
    if (prevState.dataWedge !== dataWedge) {
      this.setState({ spinner: true });
      // this.scanHandler(this.state.dataWedge);
      const params = {
        wmId,
        planningVersion,
        handlingListVersion,
        dataWedge,
        sound,
      };
      this.scanHandler(params, merchantsName, merchants, allScanned, sound);
    }
  }

  scanHandler = (params = {}, merchantsName, merchants, allScanned, sound) => handleScanning(params)
    .then(async (scanning) => {
      /** aggiorno le liste e restituisco il risultato */
      const newState = await updateFromStockAfterScan(scanning, merchantsName, merchants, allScanned);
      this.setState(newState);
    })
    .catch((e) => {
      sound.error.play();
      showError(e.message);
      this.setState({ spinner: false });
    });

  navigateBack = () => {
    const {
      merchants,
      allScanned,
    } = this.state;

    this.props.navigation.navigate(Const.routeName.fromStockList, { merchants, allScanned });
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.handleGetHandlingList({ refreshing: false });
    // this.getHandlingList({ refreshing: false });
  };

  handleGetHandlingList = (params = {}) => {
    getHandlingList(Const.fromStock, params)
      .then(async (s) => {
        if (!s.merchantsName || !s.merchants) {
          return this.setState(s);
        }
        this.setState({
          ...s,
          list: getListByMerchantFromStock(s.merchantsName, s.merchants),
        });
      })
      .catch(e => showError(e));
  };

  openDetails = (item) => {
    const photos = item.uriImages.map(uri => ({ uri }));
    this.setState({
      detailsOpen: true,
      detailsPhotos: photos,
      detailsFirstScan: item.firstScan,
      detailsLastScan: item.lastScan
    });
  };

  closeDetails = () => {
    this.setState({
      detailsOpen: false,
      detailsPhotos: [],
      detailsFirstScan: null,
      detailsLastScan: null
    });
  };

  render() {
    const {
      spinner,
      list,
      selectedItem,
      refreshing,
      scanned,
      total,
      parcelCode,
      merchant,
      position,
      totPosition,
      loadingArea,
      message,
      messageColor,
      detailsOpen,
      detailsPhotos,
      detailsFirstScan,
      detailsLastScan
    } = this.state;

    return (
      <>
        <List
          navigateBack={this.navigateBack}
          selectedItem={selectedItem}
          list={list}
          scanned={scanned}
          total={total}
          parcel={parcelCode}
          merchant={merchant}
          position={position}
          totPosition={totPosition}
          loadingArea={loadingArea}
          message={message}
          messageColor={messageColor}
          spinner={spinner}
          refreshing={refreshing}
          onRefresh={this.onRefresh}
          handleOpenDetails={this.openDetails}
        />
        <PhotoGalleryWithDetails
          visible={detailsOpen}
          photos={detailsPhotos}
          firstScan={detailsFirstScan}
          lastScan={detailsLastScan}
          onClose={this.closeDetails}
        />
      </>
    );
  }
}

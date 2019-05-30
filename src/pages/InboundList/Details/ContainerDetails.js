import React, { Component } from 'react';
import Const from '../../../mixins/constants';
import Colors from '../../../assets/colors';
import {
  getHandlingList, getScanned, getTotal, getListByMerchant, handleScanning,
} from '../../../mixins/AsyncUtils';
import { showError, objectHasKeys } from '../../../mixins/Utils';
import List from '../../../components/List';

export default class ContainerDetails extends Component {
  constructor(props) {
    super(props);
    this.navigateToMerchants = this.navigateToMerchants.bind(this);

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
        detailsType = null,
      } = {},
    } = props.navigation.state;

    const list = getListByMerchant(merchants, selectedItem, detailsType);

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
      detailsType,
      refreshing: false,
      spinner: false,
      dataWedge: props.screenProps
        ? props.screenProps.dataWedge
        : null,
      parcelCode: null,
      merchant: null,
      position: null,
      totPosition: null,
      loadingArea: null,
      message: Const.scanningAvailable,
      messageColor: Colors.lightLightTiffany,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const isFocused = nextProps.navigation.isFocused();
    const {
      params: {
        merchants = {},
        allScanned = null,
      } = {},
    } = nextProps.navigation.state;

    if (objectHasKeys(merchants) && allScanned > prevState.allScanned) {
      return { merchants, allScanned };
    }

    if (isFocused && nextProps.screenProps.dataWedge !== prevState.dataWedge) {
      return {
        dataWedge: nextProps.screenProps.dataWedge,
        message: !prevState.dataWedge
          ? Const.scanningAvailable
          : null,
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
      list,
      merchants,
      selectedItem,
      dataWedge,
      allScanned,
      detailsType,
    } = this.state;
    const {
      sound,
    } = this.props.screenProps;
    if (prevState.dataWedge !== dataWedge) {
      this.setState({ spinner: true });
      const params = {
        wmId,
        planningVersion,
        handlingListVersion,
        list,
        merchants,
        allScanned,
        dataWedge,
        sound,
      };
      handleScanning(params)
        .then(async s => this.setState(s))
        .catch((e) => {
          sound.error.play();
          showError(e.message);
          this.setState({
            spinner: false,
            message: Const.scanningAvailable,
            messageColor: Colors.lightLightTiffany,
          });
        });
    }
    if (prevState.allScanned < allScanned) {
      this.setState({
        list: getListByMerchant(merchants, selectedItem, detailsType),
        scanned: getScanned(merchants, selectedItem, detailsType),
      });
    }
  }

  navigateToMerchants = () => {
    const {
      merchants,
      allScanned,
    } = this.state;
    const {
      inboundList,
    } = Const.routeName;

    this.props.navigation.navigate(inboundList, { merchants, allScanned });
  };

  onRefresh = () => {
    const {
      selectedItem,
      detailsType,
    } = this.state;
    this.setState({ refreshing: true });
    getHandlingList(Const.localInbound, { refreshing: false })
      .then(async (s) => {
        if (!s.merchantsName || !s.merchants) {
          return this.setState(s);
        }
        this.setState({
          ...s,
          list: getListByMerchant(s.merchants, selectedItem, detailsType),
          scanned: getScanned(s.merchants, selectedItem, detailsType),
          total: getTotal(s.merchants, selectedItem, detailsType),
        });
      })
      .catch((e) => {
        console.log('........ContainerDetails error', e);
        showError(e);
      });
  };

  render() {
    const {
      spinner,
      list,
      selectedItem,
      detailsType,
      refreshing,
    } = this.state;

    return (
      <List
        refreshing={refreshing}
        selectedItem={selectedItem}
        list={list}
        listType={detailsType}
        scanned={this.state.scanned}
        total={this.state.total}
        parcel={this.state.parcelCode}
        merchant={this.state.merchant}
        position={this.state.position}
        totPosition={this.state.totPosition}
        loadingArea={this.state.loadingArea}
        message={this.state.message}
        messageColor={this.state.messageColor}
        spinner={spinner}
        onRefresh={this.onRefresh}
        navigateBack={this.navigateToMerchants}
      />
    );
  }
}

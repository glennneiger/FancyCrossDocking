import React, { Component } from 'react';
import {
  ToastAndroid,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

/** components */
import FromStock from './FromStock';

/** mixins */
import Constants from '../../mixins/constants';
import {
  objectHasKeys, showError,
} from '../../mixins/Utils';
import {
  handleScanning,
  updateFromStockAfterScan,
  getHandlingList,
  getFromStockList,
} from '../../mixins/AsyncUtils';

/** assets */
import Colors from '../../assets/colors';

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class ContainerFromStock extends Component {
  constructor(props) {
    super(props);

    this.navigateToNextScreen = this.navigateToNextScreen.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onErrorRefresh = this.onErrorRefresh.bind(this);
    // this.getList = this.getList.bind(this);
    this.openDrawer = this.openDrawer.bind(this);

    this.state = {
      wmId: null,
      planningVersion: null,
      handlingListVersion: null,
      merchantsName: [],
      merchants: {},
      total: null,
      allScanned: null,
      isFetching: true,
      refreshing: false,
      spinner: false,
      dataWedge: null,
      parcelCode: null,
      merchant: null,
      position: null,
      totPosition: null,
      loadingArea: null,
      message: Constants.scanningAvailable,
      messageColor: Colors.lightLightTiffany,
      list: [],
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      params: {
        merchants = {},
        allScanned = null,
      } = {},
    } = nextProps.navigation.state;

    /** se arrivo da "parcelsByMerchant"  mi salvo i pacchi scansionati */
    // todo: non so se questo andava eliminato
    // if (objectHasKeys(merchants) && merchants !== prevState.merchants) {
    //   console.log('ContainerFromStock merchants');
    //   return { merchants };
    // }

    if (objectHasKeys(merchants) && allScanned > prevState.allScanned) {
      return { merchants, allScanned };
    }

    const isFocused = nextProps.navigation.isFocused();
    if (isFocused && nextProps.screenProps.dataWedge !== prevState.dataWedge) {
      return {
        // spinner: true,
        dataWedge: nextProps.screenProps.dataWedge,
        message: !prevState.dataWedge ? Constants.scanningAvailable : null,
        parcelCode: null,
        position: null,
        totPosition: null,
      };
    }

    return null;
  }


  componentDidMount() {
    this.handleGetHandlingList();
    // this.getHandlingList();
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
    if (prevState.allScanned < allScanned) {
      this.setState({
        list: getFromStockList(merchantsName, merchants),
      });
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

  handleGetHandlingList = (params = {}) => {
    getHandlingList(Constants.fromStock, params)
      .then(async (s) => {
        if (!s.merchantsName || !s.merchants) {
          return this.setState(s);
        }
        this.setState({
          ...s,
          list: getFromStockList(s.merchantsName, s.merchants),
        });
      })
      .catch(e => showError(e));
  };

  navigateToNextScreen = (item) => {
    const {
      merchants,
      wmId,
      planningVersion,
      handlingListVersion,
      allScanned,
    } = this.state;

    /* Navigate to the Details route with params */
    this.props.navigation.navigate(Constants.routeName.fromStockDetails, {
      merchants,
      wmId,
      planningVersion,
      handlingListVersion,
      selectedItem: item.label,
      total: String(item.total),
      scanned: String(item.scanned),
      allScanned,
    });
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.handleGetHandlingList({ refreshing: false });
    // this.getHandlingList({ refreshing: false });
  };

  onErrorRefresh = () => {
    this.setState({ refreshing: true, isFetching: true });
    this.handleGetHandlingList({ refreshing: false });
    // this.getHandlingList({ refreshing: false });
  };

  openDrawer = () => this.props.navigation.openDrawer();

  render() {
    const {
      merchantsName,
      planningVersion,
      handlingListVersion,
      spinner,
      parcelCode,
      position,
      merchant,
      totPosition,
      message,
      messageColor,
      list,
      isFetching,
      allScanned,
      total,
      refreshing,
      loadingArea,
    } = this.state;
    const {
      section,
    } = this.props;
    if (isFetching) {
      return (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" color={Colors.lightGray} />
        </View>
      );
    }
    let error = null;
    const scanned = allScanned || 0;
    const totalScanned = total || 0;
    const errorBtn = planningVersion === null && handlingListVersion === null;

    if (!merchantsName.length) {
      error = errorBtn
        ? Constants.noPVHLV
        : Constants.noParcelsToScan;
    }

    return (
      <FromStock
        error={error}
        errorBtn={errorBtn}
        scanned={scanned}
        total={totalScanned}
        section={section}
        refreshing={refreshing}
        list={list}
        spinner={spinner}
        parcel={parcelCode}
        position={position}
        totPosition={totPosition}
        merchant={merchant}
        message={message}
        messageColor={messageColor}
        loadingArea={loadingArea}
        openDrawer={this.openDrawer}
        onRefresh={this.onRefresh}
        onErrorRefresh={this.onErrorRefresh}
        handleGoTo={this.navigateToNextScreen}
      />
    );
  }
}

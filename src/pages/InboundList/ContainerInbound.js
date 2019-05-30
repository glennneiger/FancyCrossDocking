import React, { Component } from 'react';

import {
  View, ActivityIndicator, StyleSheet,
} from 'react-native';

import withOpenDrawer from '../../hoc/withOpenDrawer';
import { objectHasKeys, showError } from '../../mixins/Utils';
import {
  getHandlingList,
  getList,
  handleScanning,
} from '../../mixins/AsyncUtils';
import Constants from '../../mixins/constants';
import Colors from '../../assets/colors';
import Inbound from './Inbound';

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class ContainerInbound extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: true,
      refreshing: false,
      spinner: false,
      wmId: null,
      planningVersion: null,
      handlingListVersion: null,
      dataWedge: null,
      parcelCode: null,
      merchant: null,
      position: null,
      totPosition: null,
      loadingArea: null,
      total: null,
      allScanned: null,
      merchantsName: [],
      merchants: {},
      message: Constants.scanningAvailable,
      messageColor: Colors.lightLightTiffany,
      list: [],
    };
  }

  /** todo: togliere getDerivedStateFromProps, non serve */
  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      params: {
        merchants = {},
        allScanned = null,
      } = {},
    } = nextProps.navigation.state;

    if (objectHasKeys(merchants) && allScanned > prevState.allScanned) {
      return { merchants, allScanned };
    }

    const isFocused = nextProps.navigation.isFocused();
    if (isFocused && nextProps.screenProps.dataWedge !== prevState.dataWedge) {
      return {
        dataWedge: nextProps.screenProps.dataWedge,
        message: !prevState.dataWedge
          ? Constants.scanningAvailable
          : null,
        parcelCode: null,
        position: null,
        totPosition: null,
      };
    }

    return null;
  }

  componentDidMount() {
    this.handleGetHandlingList();
  }

  /** se lo state del dataWedge è cambiato verifico i dati scannerizzati */
  componentDidUpdate(prevProps, prevState) {
    const {
      wmId,
      planningVersion,
      handlingListVersion,
      merchants,
      allScanned,
      merchantsName,
      dataWedge,
      list,
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
        merchants,
        allScanned,
        dataWedge,
        list,
        sound,
      };
      handleScanning(params)
        .then(async s => this.setState(s))
        .catch((e) => {
          sound.error.play();
          showError(e.message);
          this.setState({
            spinner: false,
            message: Constants.scanningAvailable,
            messageColor: Colors.lightLightTiffany,
          });
        });
    }
    if (prevState.allScanned < allScanned) {
      this.setState({
        list: getList(merchantsName, merchants),
      });
    }
  }

  handleGetHandlingList = (params = {}) => {
    getHandlingList(Constants.localInbound, params)
      .then(async (s) => {
        if (!s.merchantsName || !s.merchants) {
          return this.setState(s);
        }
        this.setState({
          ...s,
          list: getList(s.merchantsName, s.merchants),
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

    // /* Navigate to the Details route with params */
    this.props.navigation.navigate(Constants.routeName.inboundDetails, {
      merchants,
      wmId,
      planningVersion,
      handlingListVersion,
      selectedItem: item.label,
      total: String(item.total),
      scanned: String(item.scanned),
      detailsType: String(item.type),
      allScanned,
    });
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.handleGetHandlingList({ refreshing: false, merchants: null });
  };

  onErrorRefresh = () => {
    this.setState({ refreshing: true, isFetching: true });
    this.handleGetHandlingList({ refreshing: false });
  };

  render() {
    const {
      merchantsName,
      planningVersion,
      handlingListVersion,
      isFetching,
      allScanned,
      total,
      ...state
    } = this.state;
    const {
      section,
      openDrawer,
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
      <Inbound
        error={error}
        errorBtn={errorBtn}
        scanned={scanned}
        total={totalScanned}
        section={section}
        refreshing={state.refreshing}
        list={state.list}
        spinner={state.spinner}
        parcel={state.parcelCode}
        position={state.position}
        totPosition={state.totPosition}
        merchant={state.merchant}
        message={state.message}
        messageColor={state.messageColor}
        loadingArea={state.loadingArea}
        openDrawer={openDrawer}
        onRefresh={this.onRefresh}
        onErrorRefresh={this.onErrorRefresh}
        handleGoTo={this.navigateToNextScreen}
      />
    );
  }
}

export default withOpenDrawer(
  ContainerInbound,
);

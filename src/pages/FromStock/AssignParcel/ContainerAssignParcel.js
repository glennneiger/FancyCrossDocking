import React, { Component } from 'react';

import {
  View,
  ToastAndroid,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

// import Icon from '../../../node_modules/react-native-vector-icons/MaterialIcons';

/** mixins */
import Constants from '../../../mixins/constants';
import { checkRes } from '../../../mixins/ErrorHandling';
import { checkScan, setMessageForException, setMessageForHandlingState } from '../../../mixins/DigestData';
import { getData } from '../../../mixins/Utils';

import AssignParcel from './AssignParcel';

/** assets */
import Colors from '../../../assets/colors';
import FetchData from '../../../mixins/FetchData';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
  },
  activityIndicator: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class ContainerAssignParcel extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <TouchableOpacity
        style={styles.btnIcon}
        onPress={() => {
          const {
            navigate,
          } = navigation;
          const assignParcelResult = {
            spinner: false,
            parcelCode: null,
            merchant: null,
            position: null,
            totPosition: null,
            message: Constants.scanningAvailable,
            messageColor: Colors.lightLightTiffany,
          };
          navigate(Constants.routeName.scanning, { assignParcelResult });
        }}
      >
        {/* <Icon */}
        {/* style={{color: Colors.white, paddingLeft: 10}} */}
        {/* name={'arrow-back'} */}
        {/* size={30} */}
        {/* /> */}
      </TouchableOpacity>
    ),
  });

  constructor(props) {
    super(props);

    const {
      params: {
        wmId = null,
        planningVersion = null,
        handlingListVersion = null,
        orderCode = null,
        sound = null,
      } = {},
    } = props.navigation.state;

    this.state = {
      wmId,
      planningVersion,
      handlingListVersion,
      orderCode,
      sound,
      dataWedge: null,
      parcelCode: null,
      isFetching: true,
      message: null,
      messageColor: null,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.screenProps.dataWedge !== prevState.dataWedge) {
      return {
        isFetching: true,
        dataWedge: nextProps.screenProps.dataWedge,
        parcelCode: null,
      };
    }
    return null;
  }

  componentDidMount() {
    const {
      wmId = null,
      orderCode = null,
    } = this.state;
    this.getOrderCode(Number(wmId), orderCode);
  }

  /** se lo state del dataWedge è cambiato verifico i dati scannerizzati */
  componentDidUpdate(prevProps, prevState) {
    if (prevState.dataWedge !== this.state.dataWedge) {
      this.scanHandler(this.state.dataWedge);
    }
  }

  scanHandler = (dataWedge = {}) => {
    const {
      wmId,
      message,
      sound,
    } = this.state;

    checkScan(
      dataWedge,
      (data) => {
        const code = data.externalParcelCode
          ? data.externalParcelCode
          : data.parcelCode;

        if (message === Constants.notFoundScanAgain) {
          return this.getOrderCode(Number(wmId), code);
        }

        return this.setState({
          isFetching: false,
          message: null,
          messageColor: null,
          parcelCode: code,
        });
      },
      (resError) => {
        if (!resError.errorSound) {
          sound.error.play();
        }

        return this.setState({
          isFetching: false,
          message: null,
          messageColor: null,
        });
      },
    );
  };

  parcelOrderAssignment = (data) => {
    const {
      sound,
    } = this.state;
    const {
      navigate,
    } = this.props.navigation;
    FetchData.post(Constants.parcelOrderAssignmentUrl, data)
      .then(res => checkRes(
        res,
        (error) => {
          sound.error.play();
          this.setState({
            isFetching: false,
            parcelCode: null,
            message: Constants.scanMilkmanCode,
            messageColor: Colors.yellow,
          });
          ToastAndroid.showWithGravity(
            error.toastPrimaryText,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        },
        (resSuccess) => {
          const assignParcelResult = res.error
            ? setMessageForException(res, data, sound, resSuccess)
            : setMessageForHandlingState(res, sound);

          // passare dati ordine scansionato
          navigate(Constants.routeName.scanning, { assignParcelResult });
        },
      ));
  };

  getOrderCode = (wmId, search) => {
    const {
      sound,
    } = this.state;
    getData(Constants.searchOrderUrl, { wmId, search })
      .then((res) => {
        checkRes(
          res,
          (error) => {
            sound.error.play();

            this.setState({ isFetching: false });

            ToastAndroid.showWithGravity(
              error.toastPrimaryText,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          },
          () => {
            // console.log('...................success getOrderCode', res);
            if (res.orders.length > 1) {
              // todo: da gestire più avanti
              // console.log('...................molte occorrenze');
            }
            if (res.orders.length === 1) {
              // console.log('...................ho 1 solo ordine!!!!');
              this.setState({
                orderCode: res.orders[0],
                parcelCode: null,
                isFetching: false,
                message: Constants.scanMilkmanCode,
                messageColor: Colors.yellow,
              });
            }
            if (res.orders.length === 0) {
              // console.log('...................0 occorrenze');
              this.setState({
                parcelCode: null,
                isFetching: false,
                message: Constants.notFoundScanAgain,
                messageColor: Colors.pink,
              });
            }
          },
        );
      });
  };

  render() {
    const {
      orderCode,
      wmId,
      planningVersion,
      handlingListVersion,
      parcelCode,
      message,
      messageColor,
      isFetching,
    } = this.state;

    const backgroundColor = Colors.darkenTiffany;

    if (isFetching) {
      return (
        <View style={styles.container}>
          <View style={[styles.activityIndicator, { backgroundColor }]}>
            <ActivityIndicator size="large" color={Colors.lightGray} />
          </View>
        </View>
      );
    }

    return (
      <AssignParcel
        orderCode={orderCode}
        wmId={wmId}
        planningVersion={planningVersion}
        handlingListVersion={handlingListVersion}
        backgroundColor={backgroundColor}
        parcelCode={parcelCode}
        message={message}
        messageColor={messageColor}
        handleParcelOrderAssignment={() => this.parcelOrderAssignment({
          wmId,
          planningVersion,
          handlingListVersion,
          parcelCode,
          'merchant&OrderCode': orderCode,
        })}
      />
    );
  }
}

import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

/** components */
import NavBar from '../../components/navigation/NavBar';
import Scan from './Scan';

/** mixins */
import Constants from '../../mixins/constants';
import { getOptions, showError } from '../../mixins/Utils';

/** assets */
import Colors from '../../assets/colors';
import withOpenDrawer from '../../hoc/withOpenDrawer';
import { executeAndDigestScanning, executeForceInStockOrDoubleScan, scanHasAValidFormat } from '../../mixins/AsyncUtils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  activityIndicator: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class ContainerScan extends Component {
  constructor(props) {
    super(props);

    this.navigateToAssignParcel = this.navigateToAssignParcel.bind(this);

    this.state = {
      wmId: null,
      planningVersion: null,
      handlingListVersion: null,
      spinner: false,
      parcelCode: null,
      merchant: null,
      position: null,
      totPosition: null,
      dataWedge: null,
      loadingArea: null,
      firstRangeDate: null,
      firstRangeHours: null,
      message: Constants.scanningAvailable,
      messageColor: Colors.lightLightTiffany,
    };
  }

  componentDidMount() {
    getOptions(
      e => this.props.navigation.navigate('Auth'),
      state => this.setState(state),
    );
  }

  /** se sono in una route diversa dalla corrente non aggiorno.
   * se il dataWedge cambia aggiorno lo state */
  static getDerivedStateFromProps(nextProps, prevState) {
    const isFocused = nextProps.navigation.isFocused();

    const {
      params: {
        successFromManual = {},
      } = {},
    } = nextProps.navigation.state;

    if (isFocused && Object.keys(successFromManual).length) {
      return {
        ...successFromManual,
      };
    }

    if (isFocused && nextProps.screenProps.dataWedge !== prevState.dataWedge) {
      return {
        dataWedge: nextProps.screenProps.dataWedge,
        message: !prevState.dataWedge ? Constants.scanningAvailable : null,
        parcelCode: null,
        merchant: null,
        firstRangeDate: null,
        firstRangeHours: null,
      };
    }

    const {
      navigation: {
        state: {
          params: {
            assignParcelResult: nextAssignParcelResult = {},
          } = {},
        } = {},
      } = {},
    } = nextProps;

    const {
      navigation: {
        state: {
          params: {
            assignParcelResult: prevAssignParcelResult = {},
          } = {},
        } = {},
      } = {},
    } = prevState;

    if (nextAssignParcelResult !== prevAssignParcelResult) {
      return nextAssignParcelResult;
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
        dataWedge,
        sound,
      };
      this.handleScanning(params)
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
      // digestScan(
      //   dataWedge,
      //   wmId,
      //   planningVersion,
      //   handlingListVersion,
      //   sound,
      //   (success) => {
      //     if (success.spinner === true) {
      //       const data = {
      //         wmId,
      //         planningVersion,
      //         handlingListVersion,
      //       };
      //       if (success.externalParcelCode) {
      //         data.externalParcelCode = success.externalParcelCode;
      //       } else {
      //         data.parcelCode = success.parcelCode;
      //       }
      //
      //       /** se devo forzare il passaggio a "stocked" */
      //       if (success.forceInStock) {
      //         return forceInStock(
      //           data,
      //           sound,
      //           succ => this.setState(succ),
      //         );
      //       }
      //
      //       /** altrimenti applico la doppia scansione */
      //       setTimeout(() => scanning(
      //         data,
      //         sound,
      //         succ => this.setState(succ),
      //       ), 100);
      //     }
      //
      //     this.setState(success);
      //   },
      //   error => this.setState({ spinner: false }, () => ToastAndroid.showWithGravity(error, ToastAndroid.SHORT, ToastAndroid.CENTER)),
      // );
    }
  }

  handleScanning = async (data) => {
    const {
      wmId,
      planningVersion,
      handlingListVersion,
      dataWedge,
      sound,
    } = data;

    /** verifico che il formato del codice sia valido */
    const validFormat = await scanHasAValidFormat(dataWedge);
    const params = {
      ...validFormat,
      wmId: Number(wmId),
      planningVersion,
      handlingListVersion,
    };
    /** eseguo l'api di scanning */
    let scanning = await executeAndDigestScanning(params, sound);
    /** se il pacco è in stati strani eseguo azioni risolutive */
    if (scanning.spinner === true) {
      scanning = await executeForceInStockOrDoubleScan(scanning, params, sound);
    }
    return scanning;
  };

  navigateToAssignParcel = () => {
    const {
      parcelCode,
      wmId,
      planningVersion,
      handlingListVersion,
    } = this.state;
    const {
      sound,
    } = this.props.screenProps;

    this.props.navigation.navigate(Constants.routeName.assignParcel, {
      wmId,
      planningVersion,
      handlingListVersion,
      sound,
      orderCode: parcelCode,
    });
  };

  render() {
    const {
      parcelCode,
      merchant,
      position,
      totPosition,
      messageColor,
      spinner,
      message,
      loadingArea,
      firstRangeDate,
      firstRangeHours,
    } = this.state;
    const {
      section,
      openDrawer,
    } = this.props;
    let backgroundColor = Colors.darkenTiffany;

    if (spinner) {
      return (
        <View style={styles.container}>
          <NavBar
            title={section}
            iconColor={Colors.white}
            onPress={openDrawer}
          />
          <View style={[styles.activityIndicator, { backgroundColor }]}>
            <ActivityIndicator size="large" color={Colors.lightGray} />
          </View>
        </View>
      );
    }

    let detailsColor = Colors.tiffany;
    const showAssociateBtn = message === Constants.unknownParcel;

    if (messageColor === Colors.pink) {
      backgroundColor = Colors.white;
      detailsColor = Colors.pink;
    } else if (messageColor === Colors.darkenTiffany) {
      backgroundColor = Colors.lightLightTiffany;
    } else if (messageColor === Colors.darkGray1) {
      backgroundColor = Colors.lightGray;
      detailsColor = Colors.darkenTiffany;
    }

    return (
      <Scan
        section={section}
        parcelCode={parcelCode}
        merchant={merchant}
        position={position}
        totPosition={totPosition}
        messageColor={messageColor}
        message={message}
        loadingArea={loadingArea}
        firstRangeDate={firstRangeDate}
        firstRangeHours={firstRangeHours}
        openDrawer={openDrawer}
        backgroundColor={backgroundColor}
        detailsColor={detailsColor}
        showAssociateBtn={showAssociateBtn}
        navigateToAssignParcel={this.navigateToAssignParcel}
      />
    );
  }
}

export default withOpenDrawer(
  ContainerScan,
);

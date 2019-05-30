import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';

/** components */
import NavBar from '../../components/navigation/NavBar';
import Hub from './Hub';

/** assets */
import Colors from '../../assets/colors';
import Constants from '../../mixins/constants';
import { digestScanInfos } from '../../mixins/DigestData';
import { storageGetItem } from '../../mixins/Utils';
import withOpenDrawer from '../../hoc/withOpenDrawer';

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

class ContainerHub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      parcel: null,
      merchant: null,
      firstRangeDate: null,
      firstRangeHours: null,
      dataWedge: null,
      message: Constants.scanningAvailable,
      messageColor: Colors.lightGray,
    };
  }

  /** se sono in una route diversa dalla corrente non aggiorno.
   * se il dataWedge cambia aggiorno lo state */
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.screenProps.dataWedge !== prevState.dataWedge) {
      return {
        dataWedge: nextProps.screenProps.dataWedge,
        message: !prevState.dataWedge ? Constants.scanningAvailable : null,
        parcel: null,
      };
    }
    return null;
  }

  /** se lo state del dataWedge è cambiato verifico i dati scannerizzati */
  componentDidUpdate(prevProps, prevState) {
    const {
      dataWedge,
    } = this.state;
    const {
      sound,
    } = this.props.screenProps;

    if (prevState.dataWedge !== dataWedge) {
      // console.log('................Scan componentDidUpdate');
      this.setState({ spinner: true });

      storageGetItem('wmId').then((wmId) => {
        digestScanInfos(
          dataWedge,
          wmId,
          sound,
          success => this.setState(success),
          (error) => {
            this.setState({ spinner: false }, () => ToastAndroid.showWithGravity(error, ToastAndroid.SHORT, ToastAndroid.CENTER));
          },
        );
      });
    }
  }

  render() {
    const {
      parcel,
      merchant,
      firstRangeDate,
      firstRangeHours,
      message,
      messageColor,
      spinner,
    } = this.state;
    const {
      section,
      openDrawer,
    } = this.props;
    let subTextColor;
    let backgroundColor = Colors.white;
    if (messageColor === Colors.pink) {
      backgroundColor = Colors.white;
      subTextColor = Colors.pink;
    } else if (messageColor === Colors.darkenTiffany) {
      backgroundColor = Colors.lightLightTiffany;
    }

    if (spinner) {
      return (
        <View style={styles.container}>
          <NavBar
            title={section}
            iconColor={Colors.darkGray1}
            styleContainer={{ backgroundColor: Colors.darkWhite }}
            styleTitle={{ color: Colors.darkGray1 }}
            onPress={this.openDrawer}
          />
          <View style={[styles.activityIndicator]}>
            <ActivityIndicator size="large" color={Colors.lightGray} />
          </View>
        </View>
      );
    }

    switch (message) {
      case 'Milano':
        subTextColor = Colors.yellow;
        break;
      case 'Torino':
        subTextColor = Colors.violet;
        break;
      default:
        subTextColor = Colors.pink;
        break;
    }

    return (
      <Hub
        section={section}
        openDrawer={openDrawer}
        backgroundColor={backgroundColor}
        messageColor={messageColor}
        subTextColor={subTextColor}
        parcel={parcel}
        merchant={merchant}
        firstRangeDate={firstRangeDate}
        firstRangeHours={firstRangeHours}
        message={message}
      />
    );
  }
}

export default withOpenDrawer(
  ContainerHub,
);

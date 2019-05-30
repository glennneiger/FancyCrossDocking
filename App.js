/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { YellowBox, DeviceEventEmitter } from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation'; // Version can be specified in package.json

import DataWedgeIntents from 'react-native-datawedge-intents';
import Sound from 'react-native-sound';

import HoneywellDataReceiver from './src/components/receivers/HoneywellDataReceiver';
import MunBynDataReceiver from './src/components/receivers/MunBynDataReceiver';

/** pages */
import AuthLoadingScreen from './src/components/auth/AuthLoadingScreen';
import LoginScreen from './src/pages/Login/ContainerLogin';
import DrawerNav from './src/components/navigation/DrawerNav';

/** bugfix: isMounted(...) is deprecated warning */
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);
const Navigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: DrawerNav,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
    headerMode: 'none',
  },
);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataWedge: null,
      sound: {
        success: new Sound('success.mp3', Sound.MAIN_BUNDLE),
        warehouse: new Sound('warehouse.mp3', Sound.MAIN_BUNDLE),
        error: new Sound('wrong.mp3', Sound.MAIN_BUNDLE),
      },
    };
    DataWedgeIntents.registerReceiver('com.zebra.dwintents.ACTION', '');
    HoneywellDataReceiver.startReceiver();
    MunBynDataReceiver.startReceiver();
  }
  componentDidMount() {
    //console.log('...............componentDidMount App');
    DeviceEventEmitter.addListener('barcode_scan', this.scanHandler);
    //addListener
    HoneywellDataReceiver.on(HoneywellDataReceiver.BARCODE_READ_SUCCESS, this.scanHandler);
    MunBynDataReceiver.on(MunBynDataReceiver.BARCODE_READ_SUCCESS, this.scanHandler);
  }
  componentWillUnmount() {
    //console.log('...............componentWillUnmount App');
    DeviceEventEmitter.removeListener('barcode_scan', this.scanHandler);
    //removeListener
    HoneywellDataReceiver.off(HoneywellDataReceiver.BARCODE_READ_SUCCESS, this.scanHandler);
    MunBynDataReceiver.off(MunBynDataReceiver.BARCODE_READ_SUCCESS, this.scanHandler);
  }
  scanHandler = (dataWedge) => {
    //console.log('...................dataWedge', dataWedge);
    this.setState({ dataWedge });
  };
  render() {
    const {
      dataWedge,
      sound,
    } = this.state;

    return <Navigator screenProps={{ ...this.props, dataWedge, sound }} />;
  }
}

import React from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
/** components */
import ContentComponent from './ContentComponent';
/** pages */
import InboundScreen from '../../pages/Scan/ContainerScan';
import AssignParcelScreen from '../../pages/FromStock/AssignParcel/ContainerAssignParcel';
import ListFromStock from '../../pages/FromStock/ContainerFromStock';
import InboundList from '../../pages/InboundList/ContainerInbound';
import InboundListDetails from '../../pages/InboundList/Details/ContainerDetails';
import FromStockDetailsScreen from '../../pages/FromStock/Details/ContainerDetails';
import HubScreen from '../../pages/Hub/ContainerHub';
import ManualScanScreen from '../../pages/ManualScan/ContainerManualScan';
import UnknownParcelsStep0 from '../../pages/UnknownParcels/Step0/ContainerStep0';
import UnknownParcelsStep1 from '../../pages/UnknownParcels/Step1/ContainerStep1';
import UnknownParcelsStep2 from '../../pages/UnknownParcels/Step2/ContainerStep2';
import UnknownParcelsStep3 from '../../pages/UnknownParcels/Step3/ContainerStep3';
import CreateParcelStep0 from '../../pages/CreateParcel/Step0/ContainerStep0';
import CreateParcelStep1 from '../../pages/CreateParcel/Step1/ContainerStep1';
import CreateParcelStep2 from '../../pages/CreateParcel/Step2/ContainerStep2';
import CreateParcelStep3 from '../../pages/CreateParcel/Step3/ContainerStep3';
import CreateParcelStep4 from '../../pages/CreateParcel/Step4/ContainerStep4';
import ScanCameraScreen from '../../pages/ScanCamera/ScanCamera';
/** mixins && assets */
import Const from '../../mixins/constants';
import Colors from '../../assets/colors';

const ListInboundScreen = createStackNavigator({
  [Const.routeName.inboundList]: {
    screen: props => <InboundList section={Const.routeName.inboundList} {...props} />,
    navigationOptions: { header: null },
  },
  [Const.routeName.inboundDetails]: {
    screen: InboundListDetails,
    navigationOptions: { header: null },
  },
});

const FromStockScreen = createStackNavigator({
  [Const.routeName.fromStockList]: {
    screen: props => <ListFromStock section={Const.routeName.fromStock} {...props} />,
    navigationOptions: { header: null },
  },
  [Const.routeName.fromStockDetails]: {
    screen: FromStockDetailsScreen,
    navigationOptions: { header: null },
  },
});

const ScanningScreen = createStackNavigator({
  Scanning: {
    screen: props => <InboundScreen section={Const.routeName.inbound} {...props} />,
    navigationOptions: { header: null },
  },
  [Const.routeName.assignParcel]: {
    screen: AssignParcelScreen,
    navigationOptions: {
      title: Const.routeName.assignParcel,
      headerStyle: {
        backgroundColor: Colors.darkenTiffany,
      },
      headerTintColor: Colors.white,
      labelStyle: {
        fontSize: 14,
        fontFamily: 'campton_medium',
        fontWeight: 'normal',
      },
    },
  },
});

const CreateParcelScreen = createStackNavigator({
  [Const.routeName.createParcelStep0]: {
    screen: CreateParcelStep0,
    navigationOptions: { header: null }
  },
  [Const.routeName.createParcelStep1]: {
    screen: CreateParcelStep1,
    navigationOptions: { header: null }
  },
  [Const.routeName.createParcelStep2]: {
    screen: CreateParcelStep2,
    navigationOptions: { header: null }
  },
  [Const.routeName.createParcelStep3]: {
    screen: CreateParcelStep3,
    navigationOptions: { header: null }
  },
  [Const.routeName.createParcelStep4]: {
    screen: CreateParcelStep4,
    navigationOptions: { header: null }
  }
});

const UnknownParcelsScreen = createStackNavigator({
  [Const.routeName.unknownParcelStep0]: {
    screen: UnknownParcelsStep0,
    navigationOptions: { header: null },
  },
  [Const.routeName.unknownParcelStep1]: {
    screen: UnknownParcelsStep1,
    navigationOptions: {
      title: Const.routeName.unknownParcelStep1,
      headerStyle: {
        backgroundColor: Colors.darkenTiffany,
      },
      headerTintColor: '#fff',
      labelStyle: {
        fontSize: 14,
        fontFamily: 'campton_medium',
        fontWeight: 'normal',
      },
    },
  },
  [Const.routeName.scanCamera]: {
    screen: ScanCameraScreen,
    navigationOptions: {
      title: Const.routeName.scanCamera,
      headerStyle: {
        backgroundColor: Colors.darkenTiffany,
      },
      headerTintColor: '#fff',
      labelStyle: {
        fontSize: 14,
        fontFamily: 'campton_medium',
        fontWeight: 'normal',
      },
    },
  },
  [Const.routeName.unknownParcelStep2]: {
    screen: UnknownParcelsStep2,
    navigationOptions: {
      title: Const.routeName.unknownParcelStep2,
      headerStyle: {
        backgroundColor: Colors.darkenTiffany,
      },
      headerTintColor: '#fff',
      labelStyle: {
        fontSize: 14,
        fontFamily: 'campton_medium',
        fontWeight: 'normal',
      },
    },
  },
  [Const.routeName.unknownParcelStep3]: {
    screen: UnknownParcelsStep3,
    navigationOptions: { header: null },
  },
});

const RouteConfigs = ({
  [Const.routeName.hub]: {
    screen: props => <HubScreen section={Const.routeName.hub} {...props} />,
  },
  [Const.routeName.inbound]: ScanningScreen,
  [Const.routeName.manual]: {
    screen: props => <ManualScanScreen section={Const.routeName.manual} {...props} />,
  },
  [Const.routeName.inboundList]: ListInboundScreen,
  [Const.routeName.fromStockList]: FromStockScreen,
  // [Const.routeName.createParcel]: CreateParcelScreen,
  [Const.routeName.unknownParcel]: UnknownParcelsScreen,
});

const logout = async (props) => {
  await AsyncStorage.clear();
  props.navigation.navigate('Auth');
};

const DrawerNavigatorConfig = {
  initialRouteName: Const.routeName.inbound,
  lazyLoad: true,
  contentComponent: props => <ContentComponent {...props} onLogout={() => logout(props)} />,
  headerMode: 'screen',
  drawerWidth: 250,
  drawerPosition: 'left',
  contentOptions: {
    activeTintColor: Colors.tiffany,
    labelStyle: {
      fontSize: 14,
      fontFamily: 'campton_medium',
      fontWeight: 'normal',
    },
  },
};

export default createDrawerNavigator(RouteConfigs, DrawerNavigatorConfig);

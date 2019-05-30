import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';

/** mixins */
import { isValidNumber, storageGetItem } from '../../mixins/Utils';
import { getDataVersion } from '../../mixins/UtilsFn';

/** assets */
import Colors from '../../assets/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    const {
      navigate,
    } = props.navigation;

    storageGetItem('wmId').then((wmId) => {
      if (wmId === null || !isValidNumber(Number(wmId))) {
        console.log('.................AuthLoadingScreen NO wmId');
        return navigate('Auth');
      }

      return getDataVersion(
        wmId,
        (error) => {
          console.log('.................AuthLoadingScreen getDataVersion error', error);
          ToastAndroid.showWithGravity(
            error.toastPrimaryText,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          navigate('Auth');
        },
        success => navigate('App'),
      );
    });
  }

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.lightGray} />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

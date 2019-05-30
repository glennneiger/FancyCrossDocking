import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, ToastAndroid, View } from 'react-native';
import { storageGetItem } from '../../../mixins/Utils';
import { unknownParcel } from '../../../mixins/DigestData';
import Const from '../../../mixins/constants';
import Colors from '../../../assets/colors';
import Step2 from './Step2';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.white,
  },
  activityIndicator: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class ContainerStep2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      showBtn: true,
      spinner: false,
      error: false,
      errorMessage: '',
      errorColor: Colors.black
    };
  }

  confirmData = () => {
    const self = this;
    this.setState({ spinner: true });

    const {
      input = '',
    } = this.state;
    const {
      screenProps: {
        sound,
      },
      navigation: {
        state: {
          params: {
            parcel = null,
            merchantId = null,
          } = {},
        },
      },
    } = this.props;
    storageGetItem('wmId').then((wmId) => {
      const data = {
        wmId: Number(wmId),
        parcelUnknownCode: parcel,
        merchantId,
        note: input,
      };
      unknownParcel(
        data,
        sound,
        () => self.props.navigation.navigate(Const.routeName.unknownParcelStep3),
        (err) => {
          self.setState({
            spinner: false,
            input: '',
            showBtn: true,
            error: true,
            errorMessage: err.message,
            errorColor: err.messageColor
          });
        },
      );
    });
  };

  closeError = () => {
    this.setState({ error: false });
  };

  retryAfterError = () => {
    console.log('retry');
    this.closeError();
    this.confirmData();
  };

  render() {
    const {
      navigation: {
        state: {
          params: {
            parcel = null,
            merchantName = null,
          } = {},
        },
      },
    } = this.props;

    const {
      input,
      showBtn,
      spinner,
      error,
      errorMessage,
      errorColor
    } = this.state;

    if (spinner) {
      return (
        <View style={styles.container}>
          <View style={styles.activityIndicator}>
            <ActivityIndicator size="large" color={Colors.lightGray} />
          </View>
        </View>
      );
    }

    return (
      <Step2
        showBtn={showBtn}
        parcel={parcel}
        merchantName={merchantName}
        input={input}
        handleSetState={s => this.setState(s)}
        handleConfirmData={this.confirmData}
        error={error}
        errorColor={errorColor}
        errorMessage={errorMessage}
        onErrorClose={this.closeError}
        onErrorRetry={this.retryAfterError}
      />
    );
  }
}

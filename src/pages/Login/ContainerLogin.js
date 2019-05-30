import React, { Component } from 'react';
import {
  Keyboard,
  ToastAndroid,
} from 'react-native';
import { APP_ENV } from 'react-native-dotenv';

import Login from './Login';

import Constants from '../../mixins/constants';
import FetchData from '../../mixins/FetchData';
import { checkRes } from '../../mixins/ErrorHandling';
import { storageSetItem } from '../../mixins/Utils';
import { getAsyncData } from '../../mixins/AsyncUtils';

export default class ContainerLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      // openToast: false,
      username: props.username,
      password: props.password,
      dataWedge: null,
    };
  }

  /** se sono in una route diversa dalla corrente non aggiorno.
   * se il dataWedge cambia aggiorno lo state */
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.screenProps.dataWedge !== prevState.dataWedge) {
      return {
        dataWedge: nextProps.screenProps.dataWedge,
      };
    }
    return null;
  }

  /** se lo state del dataWedge è cambiato verifico i dati scannerizzati */
  componentDidUpdate(prevProps, prevState) {
    if (prevState.dataWedge !== this.state.dataWedge) {
      this.scanHandler(this.state.dataWedge);
    }
  }

  /** triggero l'errore */
  getError = (toastPrimaryText = null, state = {}) => this.setState(
    state,
    ToastAndroid.showWithGravity(
      toastPrimaryText,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    ),
  );

  /** eseguo la chiamata di login, se và a buon fine faccio il rediresct alla schermata di scan */
  login = (data) => {
    const self = this;
    const { navigate } = this.props.navigation;

    self.setState({ spinner: true });
    /** se ancora aperta chiudo la tastiera */
    Keyboard.dismiss();

    FetchData.post(this.props.loginUrl, data)
      .then(loginRes => checkRes(
        loginRes,
        error => self.getError(error.toastPrimaryText, {
          username: '',
          password: '',
          spinner: error.spinner,
        }),
        async () => {
          const merchants = await getAsyncData(Constants.merchantUrl, { wmId: Number(loginRes.wmId) });
          // const milknames = await getAsyncData(Constants.milknamesUrl, { wmId: Number(loginRes.wmId) });

          if (merchants.success) {
            storageSetItem('merchants', JSON.stringify(merchants.merchants));
          }
          // if (milknames.success) {
          //   storageSetItem('milknames', JSON.stringify(milknames.milknames));
          // }
          storageSetItem('wmId', String(loginRes.wmId)).then(() => navigate('App'));
        },
      ));
  };

  /** verifico che il formato dei dati ricevuti dallo scan siano compatibili con il login */
  checkScanRespose = (dataWedge, success, error) => {
    try {
      const parsed = JSON.parse(dataWedge);
      const {
        milkUser = null,
        milkPass = null,
      } = parsed;

      if (!milkUser || !milkPass) {
        return error({ username: null, password: null });
      }
      return success({ username: milkUser.trim(), password: milkPass.trim() });
    } catch (e) {
      return error({ username: null, password: null });
    }
  };

  /** se lo scan ha un formato accettabile provo a fare il login,
   * altrimenti restituisco un errore generico */
  scanHandler = (dataWedge) => {
    this.checkScanRespose(
      dataWedge.data,
      success => this.setState(success, () => this.login(success)),
      e => this.setState(e, () => this.getError(Constants.unknownError)),
    );
  };

  render() {
    return (
      <Login
        username={this.state.username}
        password={this.state.password}
        spinner={this.state.spinner}
        handleSetState={state => this.setState(state)}
        handleLogin={data => this.login(data)}
      />
    );
  }
}

ContainerLogin.defaultProps = {
  toastMessage: '',
  username: APP_ENV === 'prod' ? '' : Constants.username,
  password: APP_ENV === 'prod' ? '' : Constants.password,
  loginUrl: Constants.loginUrl,
};

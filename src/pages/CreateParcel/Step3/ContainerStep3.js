import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Constants from '../../../mixins/constants';
import Colors from '../../../assets/colors';
import Step3 from './Step3';
import { createFileBase64, createParcel } from '../../../mixins/DigestData';
import { storageGetItem } from '../../../mixins/Utils';

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

export default class ContainerStep3 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spinner: false,
      error: false,
      errorMessage: '',
      errorColor: Colors.black
    };
  }

  confirmData = async () => {
    this.setState({ spinner: true });
    const { screenProps: { sound }, navigation: { navigate, state: { params } } } = this.props;

    const { milkname, parcel, photos, location, notes } = params;

    let errorFound = false;
    const timeStamp = Math.floor(Date.now() / 1000);
    const photosUri = [];

    const onUploadPhotoSuccess = (res) => {
      photosUri.push(res.url);
    };

    const onUploadPhotoError = (err) => {
      errorFound = true;
      this.setState({
        spinner: false,
        error: true,
        errorMessage: err.toastPrimaryText,
        errorColor: err.toastColor
      });
    };

    const onCreateParcelSuccess = () => {
      this.setState({ spinner: false });
      navigate(Constants.routeName.createParcelStep4);
    };

    const onCreateParcelError = (err) => {
      errorFound = true;
      this.setState({
        spinner: false,
        error: true,
        errorMessage: err.toastPrimaryText,
        errorColor: err.toastColor
      });
    };

    Promise.all(photos.map((photo, index) => {
      const name = `${milkname}-${parcel}-${timeStamp}-${index}.jpg`.trim();
      return createFileBase64(name, photo.base64, sound, onUploadPhotoSuccess, onUploadPhotoError);
    })).then(async () => {
      if (errorFound) {
        return;
      }
      const wmId = await storageGetItem('wmId');
      const data = {
        wmId: Number(wmId),
        parcelCode: parcel,
        milkname,
        uriImages: photosUri,
        location,
        note: notes
      };
      await createParcel(data, sound, onCreateParcelSuccess, onCreateParcelError);
    });
  };

  closeError = () => {
    this.setState({ spinner: false, error: false });
  };

  retryAfterError = () => {
    this.setState({ error: false });
    this.confirmData();
  };

  navigateBack = () => {
    const { navigation: { goBack } } = this.props;
    goBack();
  };

  render() {
    const { navigation } = this.props;
    const { parcel, milkname, location } = navigation.state.params;

    const { spinner, error, errorMessage, errorColor } = this.state;

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
      <Step3
        goBack={this.navigateBack}
        milkname={milkname}
        parcel={parcel}
        location={location}
        confirmData={this.confirmData}
        error={error}
        errorColor={errorColor}
        errorMessage={errorMessage}
        onErrorClose={this.closeError}
        onErrorRetry={this.retryAfterError}
      />
    );
  }
}

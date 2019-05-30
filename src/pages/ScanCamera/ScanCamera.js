import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import BarcodeFinder from './BarcodeFinder';
import Colors from '../../assets/colors';
import Constants from '../../mixins/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default class ScanCamera extends Component {
  constructor(props) {
    super(props);
    this.camera = null;

    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.auto,
        barcodeFinderVisible: true,
      },
    };

    this.onBarCodeRead = this.onBarCodeRead.bind(this);
  }

  onBarCodeRead(scanResult) {
    const {
      navigation: {
        navigate,
        state: {
          params: {
            merchantId = null,
            merchantName = null,
          } = {},
        },
      },
    } = this.props;
    if (scanResult.data != null) {
      navigate(Constants.routeName.unknownParcelStep2, {
        parcel: scanResult.data,
        merchantId,
        merchantName,
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          onBarCodeRead={this.onBarCodeRead}
        >
          <BarcodeFinder width={280} height={220} borderColor={Colors.pink} borderWidth={2} />
        </RNCamera>
      </View>
    );
  }
}

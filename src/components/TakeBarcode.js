import React, { Component } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { RNCamera } from 'react-native-camera';
import PropTypes from 'prop-types';
import Colors from '../assets/colors';
import BarcodeFinder from '../pages/ScanCamera/BarcodeFinder';
import NavBar from './navigation/NavBar';
import Constants from '../mixins/constants';

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

class TakeBarcode extends Component {

  takeBarcode = (scanResult) => {
    const { onTakeBarcode } = this.props;
    if (scanResult.data !== null) {

      // JSON (QR-code)
      try {
        const json = JSON.parse(scanResult.data);
        if (typeof json === 'number') {
          onTakeBarcode(json);
        } else if (json.milkmanTrackingCode) {
          onTakeBarcode(json.milkmanTrackingCode);
        }
        return;
      } catch (e) {
        // do nothing
      }

      // MLK- prefixed
      const match = scanResult.data.match(/(mlk-|MLK-)([0-9]+)/);
      if (match && match.length) {
        onTakeBarcode(match[2]);
        return;
      }

      onTakeBarcode(scanResult.data);
    }
  };

  render() {
    const { visible, onClear } = this.props;

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={onClear}
      >
        <View style={styles.container}>
          <NavBar
            type={Constants.navBarType.goBack}
            title="Scansiona il codice pacco"
            onPress={onClear}
          />
          <RNCamera
            ref={(cam) => { this.camera = cam; }}
            style={styles.preview}
            onBarCodeRead={this.takeBarcode}
          >
            <BarcodeFinder
              width={280}
              height={220}
              borderColor={Colors.pink}
              borderWidth={2}
            />
          </RNCamera>
        </View>
      </Modal>
    );
  }
}

TakeBarcode.defaultProps = {
  visible: true,
  onClear: () => {}
};

TakeBarcode.propTypes = {
  visible: PropTypes.bool,
  onTakeBarcode: PropTypes.func.isRequired,
  onClear: PropTypes.func
};

export default TakeBarcode;

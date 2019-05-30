import React, {Component} from 'react';
import {
  Image, StyleSheet, Text, TouchableHighlight, View,
} from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../../../assets/colors';
import Fonts from '../../../assets/fonts';
import NavBar from '../../../components/navigation/NavBar';
import Constants from '../../../mixins/constants';
import TakeBarcode from '../../../components/TakeBarcode';

const barcodeAsset = require('../../../assets/images/Barcode2.png');
const scanCameraAsset = require('../../../assets/images/ScanCamera.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.darkenTiffany
  },
  message: {
    alignSelf: 'stretch',
    fontFamily: Fonts.semiBold,
    fontSize: 32,
    marginHorizontal: 25,
    paddingTop: 70,
    color: Colors.lightLightTiffany
  },
  imageContainer: {
    marginTop: 50
  },
  image: {
    width: 120,
    height: 80,
  },
  button: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 25,
    height: 66,
    width: 66,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 33,
    backgroundColor: Colors.lightenTiffany,
  },
  icon: {
    width: 30,
    height: 30,
  }
});

class Step1 extends Component {

  state = {
    isTakingBarcode: false
  };

  /* Actions */

  openCamera = () => {
    this.setState({ isTakingBarcode: true });
  };

  closeCamera = () => {
    this.setState({ isTakingBarcode: false });
  };

  saveBarcode = (barcode) => {
    const { navigateToNextScreen } = this.props;
    this.closeCamera();
    navigateToNextScreen(barcode);
  };

  /* Renders */

  renderPage = () => {
    const { goBack } = this.props;

    return (
      <View style={styles.container}>
        <NavBar
          type={Constants.navBarType.goBack}
          title={Constants.routeName.createParcelStep1}
          onPress={goBack}
        />
        <View>
          <Text style={styles.message}>Scansiona il codice pacco</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={barcodeAsset} />
        </View>
        <TouchableHighlight style={styles.button} onPress={this.openCamera}>
          <Image style={styles.icon} source={scanCameraAsset} />
        </TouchableHighlight>
      </View>
    );
  };

  renderCameraModal = () => {
    const { isTakingBarcode } = this.state;
    return (
      <TakeBarcode
        visible={isTakingBarcode}
        onTakeBarcode={this.saveBarcode}
        onClear={this.closeCamera}
      />
    );
  };

  render() {
    return (
      <>
        {this.renderPage()}
        {this.renderCameraModal()}
      </>
    );
  }
}

Step1.propTypes = {
  goBack: PropTypes.func.isRequired,
  navigateToNextScreen: PropTypes.func.isRequired
};

export default Step1;

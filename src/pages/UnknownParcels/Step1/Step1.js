import React from 'react';
import {
  Image,
  StyleSheet, Text, TouchableHighlight, View,
} from 'react-native';
import Colors from '../../../assets/colors';
import Fonts from '../../../assets/fonts';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: Colors.darkenTiffany,
  },
  messageText: {
    fontFamily: Fonts.semiBold,
    fontSize: 35,
    marginLeft: 15,
    paddingTop: 10,
    paddingBottom: 20,
    paddingRight: 10,
    color: Colors.lightLightTiffany,
  },
  subtitleText: {
    fontFamily: Fonts.semiBold,
    fontSize: 18,
    marginLeft: 15,
    paddingRight: 10,
    color: Colors.lightLightTiffany,
  },
  btnOuter: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginBottom: 10,
    marginRight: 25,
    height: 80,
  },
  icon: {
    top: 8,
    width: 30,
    height: 30,
  },
  barcodeImgOuter: {
    flex: 2,
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 25,
  },
  barcodeImg: {
    width: 140,
    height: 85,
  },
  btn: {
    alignItems: 'center',
    backgroundColor: Colors.lightLightTiffany,
    padding: 10,
    width: 70,
    height: 70,
    borderRadius: 40,
  },
});

const Step1 = ({
  message,
  subtitle,
  handleOpenDrawer, // this.openDrawer
  handleNavigateToNextScreen, // this.navigateToScanCamera
}) => (
  <View style={styles.container}>
    <View>
      <Text style={styles.messageText}>
        {message}
      </Text>
      <Text style={styles.subtitleText}>
        {subtitle}
      </Text>
    </View>
    <View style={styles.barcodeImgOuter}>
      <Image
        style={styles.barcodeImg}
        source={require('../../../assets/images/Barcode.png')}
      />
    </View>
    <View style={styles.btnOuter}>
      <TouchableHighlight
        style={styles.btn}
        onPress={handleNavigateToNextScreen}
      >
        <Image
          style={styles.icon}
          source={require('../../../assets/images/Barcode.png')}
        />
      </TouchableHighlight>
    </View>
  </View>
);

export default Step1;

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

/** components */
import NavBar from '../../components/navigation/NavBar';

/** assets */
import Colors from '../../assets/colors';
import Constants from '../../mixins/constants';
import Fonts from '../../assets/fonts';
import IconInputCustom from '../../components/fields/IconInputCustom';
import {
  btn as btnStyle,
  btnLabel as btnLabelStyle,
} from '../../assets/style';

const WIDTH = Dimensions.get('window').width;
const BTN_LABEL = 'CONFERMA';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  containerOuter1: {
    width: WIDTH,
    alignSelf: 'stretch',
    height: 40,
    marginTop: 10,
    marginBottom: 5,
  },
  messageText: {
    fontFamily: Fonts.book,
    fontSize: 20,
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 20,
    paddingRight: 10,
  },
});

const ManualScan = ({
  section,
  message,
  messageColor,
  spinner,
  parcelCode,
  externalParcelCode,
  errorText,
  iconColor,
  openDrawer,
  setState,
  handleScan,
}) => (
  <View style={styles.container}>
    <NavBar
      title={section}
      styleContainer={{ backgroundColor: Colors.yellow }}
      styleTitle={{ color: Colors.darkGray1 }}
      iconColor={Colors.darkGray1}
      onPress={openDrawer}
    />
    <Text style={[styles.messageText, { backgroundColor: Colors.yellow, color: Colors.darkGray1 }]}>
      {Constants.manualScanAvailable}
    </Text>

    <View style={[styles.container, { backgroundColor: Colors.white }]}>
      <View style={styles.containerOuter1}>
        <IconInputCustom
          placeholder="codice pacco"
          textLeft="MLK-"
          keyboardType="numeric"
          iconColor={iconColor}
          onChangeText={r => setState('parcelCode', String(r.text))}
          value={parcelCode}
          defaultValue={parcelCode}
        />
      </View>
      <View style={styles.containerOuter1}>
        <IconInputCustom
          textLeft="Oppure"
          placeholder="codice esterno"
          iconColor={iconColor}
          onChangeText={r => setState('externalParcelCode', String(r.text))}
          value={externalParcelCode}
          defaultValue={externalParcelCode}
          errorText={errorText}
        />
      </View>
      {!spinner
      && (
      <TouchableHighlight
        underlayColor={Colors.white}
        style={[btnStyle, { backgroundColor: Colors.yellow, marginTop: 100 }]}
        onPress={handleScan}
      >
        <Text style={[btnLabelStyle, { color: Colors.darkGray1 }]}>
          {BTN_LABEL}
        </Text>
      </TouchableHighlight>
      )
      }
    </View>
  </View>
);

export default ManualScan;

ManualScan.propTypes = {
  spinner: PropTypes.bool,
  message: PropTypes.string,
  parcelCode: PropTypes.string,
  externalParcelCode: PropTypes.string,
  section: PropTypes.string,
  messageColor: PropTypes.string,
  errorText: PropTypes.string,
  iconColor: PropTypes.string,
  openDrawer: PropTypes.func,
  setState: PropTypes.func,
  handleScan: PropTypes.func,
};

ManualScan.defaultProps = {
  spinner: false,
  message: null,
  parcelCode: null,
  externalParcelCode: null,
  section: '',
  messageColor: '',
  errorText: '',
  iconColor: '',
  openDrawer: () => {},
  setState: () => {},
  handleScan: () => {},
};

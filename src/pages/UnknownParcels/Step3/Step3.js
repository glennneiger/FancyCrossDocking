import React from 'react';
import {
  StyleSheet, Text, TouchableHighlight, View,
} from 'react-native';
import Colors from '../../../assets/colors';
import Fonts from '../../../assets/fonts';
import { btn as btnStyle, btnLabel as btnLabelStyle } from '../../../assets/style';
import Constants from '../../../mixins/constants';
import NavBar from '../../../components/navigation/NavBar';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.darkenTiffany,
  },
  messageText: {
    fontFamily: Fonts.semiBold,
    fontSize: 35,
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 20,
    color: Colors.lightLightTiffany,
  },
  btnOuter: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginBottom: 10,
    height: 80,
  },
});

const BTN_LABEL = 'LEGGI UN ALTRO PACCO';
const MESSAGE = 'Dati confermati e pacco registrato';

const Step3 = ({
  message,
  subtitle,
  handleNavigateToFirstScreen,
  openDrawer
}) => (
  <View style={styles.container}>
    <NavBar
      title={Constants.routeName.unknownParcelStep3}
      type={Constants.navBarType.openDrawer}
      onPress={openDrawer}
    />
    <View>
      <Text style={styles.messageText}>
        {MESSAGE}
      </Text>
    </View>
    <View style={styles.btnOuter}>
      <TouchableHighlight
        underlayColor={Colors.white}
        style={[btnStyle, { backgroundColor: Colors.white, marginTop: 100 }]}
        onPress={handleNavigateToFirstScreen}
      >
        <Text style={[btnLabelStyle, { color: Colors.darkenTiffany }]}>
          {BTN_LABEL}
        </Text>
      </TouchableHighlight>
    </View>
  </View>
);

export default Step3;

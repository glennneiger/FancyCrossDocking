import React from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../../../assets/colors';
import Fonts from '../../../assets/fonts';
import { btn as btnStyle, btnLabel as btnLabelStyle } from '../../../assets/style';
import NavBar from '../../../components/navigation/NavBar';
import Constants from '../../../mixins/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.darkenTiffany
  },
  message: {
    flex: 1,
    alignSelf: 'stretch',
    fontFamily: Fonts.book,
    fontSize: 32,
    lineHeight: 38,
    paddingTop: 70,
    paddingHorizontal: 15,
    color: Colors.white
  },
  button: {
    marginBottom: 20,
    backgroundColor: Colors.white
  }
});

const labelMessage = 'Pacco registrato';
const labelButton = 'LEGGI UN ALTRO PACCO';

const Step4 = (props) => {

  const { openDrawer, onButtonPress } = props;

  return (
    <View style={styles.container}>
      <NavBar
        title={Constants.routeName.createParcelStep4}
        type={Constants.navBarType.openDrawer}
        onPress={openDrawer}
      />
      <Text style={styles.message}>
        {labelMessage}
      </Text>
      <TouchableHighlight
        underlayColor={Colors.white}
        style={[btnStyle, styles.button]}
        onPress={onButtonPress}
      >
        <Text style={[btnLabelStyle, { color: Colors.darkenTiffany }]}>
          {labelButton}
        </Text>
      </TouchableHighlight>
    </View>
  );
};

Step4.propTypes = {
  openDrawer: PropTypes.func.isRequired,
  onButtonPress: PropTypes.func.isRequired
};

export default Step4;

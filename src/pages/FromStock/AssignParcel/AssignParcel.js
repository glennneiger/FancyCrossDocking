import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

/** assets */
import Colors from '../../../assets/colors';
import {
  btn as btnStyle,
  btnLabel as btnLabelStyle,
} from '../../../assets/style';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
  },
  parcelContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    margin: 10,
  },
  detailsLabelText: {
    fontFamily: 'campton_semi_bold',
    fontSize: 18,
    paddingLeft: 10,
    alignSelf: 'flex-start',
    color: Colors.darkenTiffany,
  },
  detailsText: {
    fontFamily: 'campton_semi_bold',
    fontSize: 22,
    paddingLeft: 10,
    alignSelf: 'flex-start',
    color: Colors.tiffany,
  },
});

const orderCodeLabel = 'Codice ordine';
const parcelCodeLabel = 'Codice pacco';
const BTN_LABEL = 'ASSOCIA PACCO';

const AssignParcel = ({
  orderCode,
  parcelCode,
  message,
  messageColor,
  backgroundColor,
  handleParcelOrderAssignment,
}) => (
  <View style={styles.container}>
    <View style={styles.parcelContainer}>
      <Text style={[styles.detailsLabelText, { color: Colors.darkenTiffany, marginTop: 15 }]}>
        {orderCodeLabel}
      </Text>
      {orderCode
      && (
      <Text style={[styles.detailsText, { color: Colors.tiffany }]}>
        {orderCode}
      </Text>
      )
      }
      {parcelCode
      && (
      <Text style={[styles.detailsLabelText, { color: Colors.darkenTiffany, marginTop: 15 }]}>
        {parcelCodeLabel}
      </Text>
      )
      }
      {parcelCode
      && (
      <Text style={[styles.detailsText, { color: Colors.tiffany }]}>
        {parcelCode}
      </Text>
      )
      }
      {message
      && <Text style={[styles.detailsText, { color: messageColor, marginTop: 20, fontSize: 36 }]}>{message}</Text>
      }
    </View>
    {parcelCode
    && (
    <TouchableHighlight
      underlayColor={Colors.white}
      style={[btnStyle, { backgroundColor: Colors.darkenTiffany, marginTop: 100 }]}
      onPress={handleParcelOrderAssignment}
    >
      <Text style={[btnLabelStyle, { color: Colors.white }]}>
        {BTN_LABEL}
      </Text>
    </TouchableHighlight>
    )
    }
  </View>
);

export default AssignParcel;

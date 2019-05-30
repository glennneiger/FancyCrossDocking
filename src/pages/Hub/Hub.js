import React from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

/** components */
import NavBar from '../../components/navigation/NavBar';

/** assets */
import Colors from '../../assets/colors';
import Fonts from '../../assets/fonts';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  lineUnderText: {
    flex: 1,
    maxHeight: 15,
    marginBottom: 20,
  },
  messageText: {
    fontFamily: Fonts.semiBold,
    fontSize: 40,
    marginLeft: 15,
    paddingTop: 40,
    paddingBottom: 20,
    paddingRight: 10,
  },
  parcelContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    margin: 10,
  },
  subText: {
    fontFamily: Fonts.semiBold,
    fontSize: 28,
    paddingLeft: 10,
    paddingRight: 10,
    color: Colors.darkGray1,
  },
  subTextLowLevel: {
    fontFamily: Fonts.semiBold,
    fontSize: 24,
    paddingLeft: 10,
    paddingRight: 10,
    color: Colors.gray,
  },
});

const Hub = ({
  section,
  openDrawer,
  backgroundColor,
  messageColor,
  subTextColor,
  parcel,
  merchant,
  firstRangeDate,
  firstRangeHours,
  message,
}) => (
  <View style={styles.container}>
    <NavBar
      title={section}
      iconColor={Colors.darkGray1}
      styleContainer={{ backgroundColor: Colors.darkWhite }}
      styleTitle={{ color: Colors.darkGray1 }}
      onPress={openDrawer}
    />
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.messageText, { color: messageColor }]}>
        {message}
      </Text>
      {parcel
      && (
      <View style={styles.parcelContainer}>
        <View style={[styles.lineUnderText, { backgroundColor: subTextColor }]} />
        <Text style={styles.subText}>
          {parcel}
        </Text>
        <Text style={styles.subTextLowLevel}>
          {merchant}
        </Text>
        {firstRangeDate
        && (
        <Text style={[styles.subText, { marginTop: 15 }]}>
          {firstRangeDate}
        </Text>
        )
        }
        {firstRangeHours
        && (
        <Text style={styles.subTextLowLevel}>
          {firstRangeHours}
        </Text>
        )
        }
      </View>
      )
      }
    </View>
  </View>
);

export default Hub;

Hub.propTypes = {
  section: PropTypes.string,
  backgroundColor: PropTypes.string,
  messageColor: PropTypes.string,
  subTextColor: PropTypes.string,
  message: PropTypes.string,
  parcel: PropTypes.string,
  merchant: PropTypes.string,
  openDrawer: PropTypes.func,
};

Hub.defaultProps = {
  section: '',
  backgroundColor: Colors.white,
  messageColor: Colors.darkGray1,
  subTextColor: Colors.darkGray1,
  message: '',
  parcel: null,
  merchant: null,
  openDrawer: () => {},
};

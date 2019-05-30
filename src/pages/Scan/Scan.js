import React from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

/** components */
import NavBar from '../../components/navigation/NavBar';

/** assets */
import Colors from '../../assets/colors';
import Fonts from '../../assets/fonts';

import {
  btn as btnStyle,
  btnLabel as btnLabelStyle,
} from '../../assets/style';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  messageText: {
    fontFamily: Fonts.semiBold,
    fontSize: 36,
    padding: 10,
  },
  parcelContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    margin: 10,
  },
  parcelTextWhite: {
    fontFamily: Fonts.semiBold,
    fontSize: 33,
    padding: 12,
    alignSelf: 'flex-start',
    color: Colors.lightLightTiffany,
  },
  detailsText: {
    fontFamily: Fonts.semiBold,
    fontSize: 22,
    paddingLeft: 10,
    alignSelf: 'flex-start',
    color: Colors.tiffany,
  },
});

const BTN_LABEL = 'CREA PACCO';

const Scan = ({
  section,
  parcelCode,
  merchant,
  loadingArea,
  position,
  totPosition,
  messageColor,
  message,
  openDrawer,
  backgroundColor,
  detailsColor,
  showAssociateBtn,
  navigateToAssignParcel,
  firstRangeDate,
  firstRangeHours,
}) => (
  <View style={styles.container}>
    <NavBar
      title={section}
      iconColor={Colors.white}
      onPress={openDrawer}
    />
    <View style={[styles.container, { backgroundColor }]}>
      {(loadingArea || position)
      && (
      <View style={{ flex: 1, flexDirection: 'row', height: 80 }}>
        <View>
          {loadingArea
          && (
          <Text style={[styles.parcelTextWhite, { backgroundColor: messageColor, margin: 10 }]}>
            {`${loadingArea}.${position}`}
          </Text>
          )
          }
        </View>
        <View style={{ height: 80, margin: 10 }}>
          {position
          && (
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={[styles.messageText, { width: 100, fontSize: 22, padding: 5, color: detailsColor }]}>
                {`di ${totPosition} step`}
              </Text>
            </View>
          </View>
          )
          }
        </View>
      </View>
      )
      }
      <Text style={[styles.messageText, {
        flex: 2,
        flexDirection: 'row',
        color: messageColor,
        marginBottom: 25,
      }]}
      >
        {message}
      </Text>
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ height: 30 }}>
          {merchant
          && (
          <Text style={[styles.detailsText, { color: detailsColor }]}>
            {merchant}
          </Text>
          )
          }
        </View>
        <View style={{ height: 30 }}>
          {parcelCode
          && (
          <Text style={[styles.detailsText, { color: detailsColor }]}>
            {parcelCode}
          </Text>
          )
          }
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ height: 30 }}>
          {firstRangeDate
          && (
          <Text style={[styles.detailsText, { fontSize: 25, color: Colors.darkenTiffany }]}>
            {firstRangeDate}
          </Text>
          )
          }
        </View>
        <View style={{ height: 30 }}>
          {firstRangeHours
          && (
          <Text style={[styles.detailsText, { fontSize: 20, color: Colors.darkenTiffany }]}>
            {firstRangeHours}
          </Text>
          )
          }
        </View>
      </View>
      {showAssociateBtn
        && (
        <TouchableHighlight
          underlayColor={Colors.white}
          style={[btnStyle, { backgroundColor: Colors.darkenTiffany, marginTop: 100 }]}
          onPress={navigateToAssignParcel}
        >
          <Text style={[btnLabelStyle, { color: Colors.white }]}>
            {BTN_LABEL}
          </Text>
        </TouchableHighlight>
        )
      }
    </View>
  </View>
);

export default Scan;

Scan.propTypes = {
  showAssociateBtn: PropTypes.bool,
  section: PropTypes.string,
  parcelCode: PropTypes.string,
  merchant: PropTypes.string,
  position: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  totPosition: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  messageColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  detailsColor: PropTypes.string,
  message: PropTypes.string,
  navigateToAssignParcel: PropTypes.func,
  openDrawer: PropTypes.func,
};

Scan.defaultProps = {
  showAssociateBtn: false,
  section: '',
  parcelCode: '',
  merchant: '',
  position: '',
  totPosition: '',
  message: null,
  messageColor: Colors.darkGray1,
  backgroundColor: Colors.white,
  detailsColor: Colors.darkGray1,
  openDrawer: () => {},
  navigateToAssignParcel: () => {},
};

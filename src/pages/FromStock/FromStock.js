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
import MessageView from '../../components/MessageView';
import MyMerchantsList from './Fragments/MyMerchantsList';

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
    justifyContent: 'space-between',
  },
  messageText: {
    fontFamily: Fonts.semiBold,
    fontSize: 26,
    marginLeft: 15,
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 10,
  },
});

const UPDATE = 'AGGIORNA';
// Stateless Functional Components
const FromStock = ({
  error,
  errorBtn,
  refreshing,
  list,
  total,
  scanned,
  loadingArea,
  section,
  openDrawer,
  onRefresh,
  onErrorRefresh,
  spinner,
  parcel,
  position,
  totPosition,
  merchant,
  message,
  messageColor,
  handleGoTo,
}) => (
  <View style={styles.container}>
    <NavBar
      title={section}
      iconColor={Colors.white}
      rightText={`${scanned}/${total}`}
      onPress={openDrawer}
    />
    <View style={styles.container}>
      {
        error
        && (
        <View style={[styles.container, { backgroundColor: Colors.white }]}>
          <Text style={[styles.messageText, { color: errorBtn ? Colors.pink : Colors.darkGray1 }]}>
            {error}
          </Text>
          { errorBtn
          && (
          <TouchableHighlight
            underlayColor={Colors.white}
            style={[btnStyle, { backgroundColor: Colors.pink, marginTop: 100 }]}
            onPress={onErrorRefresh}
          >
            <Text style={[btnLabelStyle, { color: Colors.white }]}>
              {UPDATE}
            </Text>
          </TouchableHighlight>
          )
          }
        </View>
        )
      }
      <View style={{ height: !error ? '100%' : 0 }}>
        <MessageView
          spinner={spinner}
          parcel={parcel}
          position={position}
          merchant={merchant}
          totPosition={totPosition}
          loadingArea={loadingArea}
          message={message}
          messageColor={messageColor}
        />
        <MyMerchantsList
          onRefresh={onRefresh}
          refreshing={refreshing}
          list={list}
          handleGoTo={handleGoTo}
        />
      </View>
    </View>
  </View>
);

export default FromStock;

FromStock.propTypes = {
  errorBtn: PropTypes.bool,
  refreshing: PropTypes.bool,
  spinner: PropTypes.bool,
  total: PropTypes.number,
  scanned: PropTypes.number,
  error: PropTypes.string,
  section: PropTypes.string,
  parcel: PropTypes.string,
  position: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  totPosition: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  merchant: PropTypes.string,
  message: PropTypes.string,
  messageColor: PropTypes.string,
  list: PropTypes.array,
  openDrawer: PropTypes.func,
  onRefresh: PropTypes.func,
  handleGoTo: PropTypes.func,
};


FromStock.defaultProps = {
  errorBtn: false,
  refreshing: false,
  spinner: false,
  error: '',
  total: 0,
  scanned: 0,
  section: '',
  parcel: '',
  position: '',
  totPosition: '',
  merchant: '',
  message: '',
  messageColor: Colors.white,
  list: [],
  openDrawer: () => {},
  onRefresh: () => {},
  handleGoTo: () => {},
};

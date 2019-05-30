import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
} from 'react-native';

/** components */
import MessageView from './MessageView';
import MyList from './MyList';
import BottomTabBar from './navigation/BottomTabBar';
import Colors from '../assets/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

const List = ({
  navigateBack,
  selectedItem,
  list,
  listType,
  scanned,
  total,
  parcel,
  loadingArea,
  merchant,
  position,
  totPosition,
  message,
  messageColor,
  onRefresh,
  refreshing,
  spinner,
  handleOpenDetails
}) => (
  <View style={styles.container}>
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
    <MyList
      onRefresh={onRefresh}
      refreshing={refreshing}
      list={list}
      handleOpenDetails={item => handleOpenDetails(item)}
    />
    <BottomTabBar
      listType={listType}
      onPress={navigateBack}
      selectedItem={selectedItem}
      total={total}
      scanned={scanned}
    />
  </View>
);

export default List;

List.propTypes = {
  spinner: PropTypes.bool,
  loadingArea: PropTypes.string,
  scanned: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  total: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  position: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  totPosition: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  selectedItem: PropTypes.string,
  parcel: PropTypes.string,
  merchant: PropTypes.string,
  message: PropTypes.string,
  messageColor: PropTypes.string,
  list: PropTypes.array,
  navigateBack: PropTypes.func,
  handleOpenDetails: PropTypes.func
};

List.defaultProps = {
  spinner: false,
  scanned: 0,
  total: 0,
  position: 0,
  totPosition: 0,
  selectedItem: null,
  loadingArea: '',
  parcel: '',
  merchant: '',
  message: '',
  messageColor: Colors.white,
  list: [],
  navigateBack: () => {},
  handleOpenDetails: () => {}
};

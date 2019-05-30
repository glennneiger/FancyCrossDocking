import {
  StyleSheet, View, Text, TouchableHighlight,
} from 'react-native';
import React from 'react';
import NavBar from '../../components/navigation/NavBar';
import Colors from '../../assets/colors';
import Fonts from '../../assets/fonts';
import MessageView from '../../components/MessageView';
import MerchantsList from './Fragments/MerchantsList';
import { btn as btnStyle, btnLabel as btnLabelStyle } from '../../assets/style';

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

const Inbound = ({
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
        <MerchantsList
          onRefresh={onRefresh}
          refreshing={refreshing}
          list={list}
          handleGoTo={handleGoTo}
        />
      </View>
    </View>
  </View>
);
export default Inbound;

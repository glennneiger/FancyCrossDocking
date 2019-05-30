import React from 'react';

import { DrawerItems } from 'react-navigation';

import {
  View,
  Text,
  Image,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';

import Colors from '../../assets/colors';
import Constants from '../../mixins/constants';

const styles = StyleSheet.create({
  contentComponent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  headerContainer: {
    height: 90,
    backgroundColor: Colors.darkenTiffany,
  },
  headerIcon: {
    width: 180,
    height: 41,
    marginTop: 15,
    marginLeft: 15,
  },
  btnIcon: {
    width: 56,
    height: 56,
    padding: 13,
  },
  footerContainer: {
    height: 54,
    backgroundColor: Colors.white,
  },
  footerInner: {
    flex: 1,
    flexDirection: 'row',
  },
  footerText: {
    color: Colors.darkenGray,
    fontSize: 16,
    fontFamily: 'campton_medium',
    fontWeight: 'bold',
    marginTop: 16,
    marginLeft: 10,
  },
  footerItem: {
    width: 14,
    height: 16,
    marginTop: 5,
    marginLeft: 8,
  },
  versionColumnContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  versionRowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  versionText: {
    color: Colors.white,
    fontSize: 12,
    fontFamily: 'campton_medium',
    fontWeight: 'bold',
    margin: 8,
  },
});

export default ContentComponent = ({ onLogout, ...props }) => (
  <View style={styles.contentComponent}>
    <View>
      <View style={styles.headerContainer}>
        <Image
          style={styles.headerIcon}
          source={require('../../assets/images/LogoNavBar.png')}
        />
        <View style={styles.versionColumnContainer}>
          <View style={styles.versionRowContainer}>
            <Text style={styles.versionText}>{Constants.version}</Text>
          </View>
        </View>
      </View>
      <DrawerItems {...props} />
    </View>

    <View style={styles.footerContainer}>
      <TouchableNativeFeedback onPress={onLogout}>

        <View style={styles.footerInner}>
          <View style={styles.btnIcon}>
            <Image
              style={styles.footerItem}
              source={require('../../assets/images/Icon-LogOut.png')}
            />
          </View>
          <Text style={styles.footerText}>Logout</Text>
        </View>

      </TouchableNativeFeedback>
    </View>
  </View>
);

// ContentComponent.propTypes = {
//   title: React.PropTypes.string,
//   leftItem: React.PropTypes.bool,
//   onLeft: React.PropTypes.func,
//   onRight: React.PropTypes.func
// };

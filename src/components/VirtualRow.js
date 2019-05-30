import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

/** assets */
import Colors from '../assets/colors';
import Info from './svg/Info';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.lightenGray
  },
  containerRow: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 70,
    padding: 8,
  },
  optional: {
    backgroundColor: Colors.darkenTiffany,
    color: Colors.white,
    fontFamily: 'Campton_medium',
    fontSize: 16,
    marginRight: 10,
    paddingLeft: 2,
    paddingRight: 2,
  },
  details: {
    marginRight: 20
  }
});

class VirtualRow extends PureComponent {
  render() {
    const {
      itemKey,
      scanned,
      primaryText,
      secondaryText,
      optional1Text,
      optional2Text,
      showDetails,
      handleOpenDetails
    } = this.props;

    const colorFirst = scanned ? Colors.darkGray : Colors.darkenTiffany;
    const colorSecond = scanned ? Colors.darkGray : Colors.tiffany;
    const backgroundColor = scanned ? Colors.lightenGray : Colors.white;

    return (
      <View key={itemKey} style={[styles.container, { backgroundColor }]}>
        <View style={styles.containerRow}>
          <View style={{ flex: 1, flexDirection: 'row', height: 80 }}>
            <View>
              {optional1Text && (
                <Text style={styles.optional}>
                  {optional1Text}
                </Text>
              )}
            </View>
            <Text style={{ color: colorFirst, fontFamily: 'Campton_medium', fontSize: 16 }}>{primaryText}</Text>
          </View>
          <Text style={{ color: colorSecond, fontFamily: 'Campton_medium', fontSize: 12 }}>
            {optional2Text ? `${secondaryText} - ${optional2Text}` : secondaryText}
          </Text>
        </View>
        {showDetails && (
          <TouchableOpacity style={styles.details} onPress={handleOpenDetails}>
            <Info />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

VirtualRow.propTypes = {
  itemKey: PropTypes.string,
  scanned: PropTypes.bool,
  primaryText: PropTypes.string,
  secondaryText: PropTypes.string,
  optional1Text: PropTypes.string,
  optional2Text: PropTypes.string,
  showDetails: PropTypes.bool,
  handleOpenDetails: PropTypes.func
};

VirtualRow.defaultProps = {
  itemKey: null,
  scanned: false,
  primaryText: null,
  secondaryText: null,
  optional1Text: null,
  optional2Text: null,
  showDetails: false,
  handleOpenDetails: () => {}
};

export default VirtualRow;

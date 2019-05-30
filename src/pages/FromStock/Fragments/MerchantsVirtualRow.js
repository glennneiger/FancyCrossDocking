import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';

/** assets */
import Colors from '../../../assets/colors';

const styles = StyleSheet.create({
  containerRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: Colors.lightenGray,
    borderBottomWidth: 1,
  },
  itemRowContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
  },
});

class MerchantsVirtualRow extends PureComponent {
  render() {
    const {
      itemKey,
      handleGoTo,
      scanned,
      total,
      primaryText,
    } = this.props;

    const backgroundColor = scanned === total ? Colors.lightenGray : Colors.darkGray1;
    const color = scanned === total ? Colors.gray : Colors.lightenGray;
    const textStyle = {
      color,
      fontFamily: 'campton_semi_bold',
    };

    return (
      <TouchableNativeFeedback
        key={itemKey}
        onPress={() => handleGoTo({ label: primaryText, total, scanned })}
      >
        <View style={{ backgroundColor }}>
          <View style={styles.containerRow}>
            <View style={[styles.itemRowContainer, { width: 200, paddingLeft: 13 }]}>
              <Text style={textStyle}>{primaryText.toUpperCase()}</Text>
            </View>
            <View style={styles.itemRowContainer}>
              <Text style={textStyle}>
                {scanned ? String(scanned) : '0'}
                {' '}
\
                {' '}
                {total ? String(total) : '0'}
              </Text>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

MerchantsVirtualRow.propTypes = {
  itemKey: PropTypes.string,
  scanned: PropTypes.number,
  total: PropTypes.number,
  primaryText: PropTypes.string,
  handleGoTo: PropTypes.func,
};

MerchantsVirtualRow.defaultProps = {
  itemKey: null,
  scanned: null,
  total: null,
  primaryText: '',
  handleGoTo: () => {},
};

export default MerchantsVirtualRow;

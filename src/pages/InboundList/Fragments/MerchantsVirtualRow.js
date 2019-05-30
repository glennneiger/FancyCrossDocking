import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';

import StockIcon from '../../../components/svg/StockIcon';
import BayIcon from '../../../components/svg/BayIcon';

import Colors from '../../../assets/colors';

const styles = StyleSheet.create({
  containerRow: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  itemRowContainer: {
    width: 50,
    height: 30,
    justifyContent: 'center',
  },
});

class merchantsVirtualRow extends PureComponent {
  render() {
    const {
      itemKey,
      handleGoTo,
      stockScanned,
      stockTotal,
      bayScanned,
      bayTotal,
      primaryText,
    } = this.props;

    const backgroundColor = Colors.darkGray1;
    let stockColor = Colors.lightenGray;
    let bayColor = Colors.lightenGray;

    if (bayScanned > 0) {
      bayColor = Colors.yellow;
    }
    if (stockScanned > 0) {
      stockColor = Colors.yellow;
    }
    if (bayScanned === bayTotal || bayTotal === 0) {
      bayColor = Colors.darkGray;
    }
    if (stockScanned === stockTotal || stockTotal === 0) {
      stockColor = Colors.darkGray;
    }

    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor,
        borderBottomColor: Colors.darkGray,
        borderBottomWidth: 1,
      }}
      >
        <View style={styles.containerRow}>
          <View style={{
            height: 30,
            justifyContent: 'center',
            width: 200,
            paddingLeft: 10,
            paddingTop: 4,
          }}
          >
            <Text style={{ color: Colors.lightenGray, fontFamily: 'campton_semi_bold' }}>
              {primaryText.toUpperCase()}
            </Text>
          </View>
        </View>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          marginBottom: 8,
          marginRight: 10,
          marginLeft: 10,
        }}
        >
          <TouchableNativeFeedback
            key={`${itemKey}-bay`}
            disabled={bayTotal === 0}
            onPress={() => handleGoTo({
              label: primaryText,
              total: bayTotal,
              scanned: bayScanned,
              type: 'To Load',
            })}
          >
            <View style={{
              flex: 1,
              flexDirection: 'row',
              borderRightColor: Colors.darkGray,
              borderRightWidth: 1,
            }}
            >
              <View style={{ width: 40, height: 35, justifyContent: 'center' }}>
                <BayIcon width="32" height="32" viewBox="0 0 32 32" color={bayColor} />
              </View>
              <View style={{ width: 80, height: 35, justifyContent: 'center' }}>
                <Text style={{
                  color: bayColor,
                  fontFamily: 'campton_semi_bold',
                }}
                >
                  {`Baia ${bayScanned}/${bayTotal}`}
                </Text>
              </View>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            key={`${itemKey}-stock`}
            disabled={stockTotal === 0}
            onPress={() => handleGoTo({
              label: primaryText,
              total: stockTotal,
              scanned: stockScanned,
              type: 'In Stock',
            })}
          >
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{
                marginLeft: 20, width: 40, height: 35, justifyContent: 'center',
              }}
              >
                <StockIcon width="32" height="32" viewBox="0 0 32 32" color={stockColor} />
              </View>
              <View style={{ width: 80, height: 35, justifyContent: 'center' }}>
                <Text style={{
                  color: stockColor,
                  fontFamily: 'campton_semi_bold',
                }}
                >
                  {`Giacenza ${stockScanned}/${stockTotal}`}
                </Text>
              </View>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  }
}
merchantsVirtualRow.propTypes = {
  itemKey: PropTypes.string,
  primaryText: PropTypes.string,
  stockScanned: PropTypes.number,
  stockTotal: PropTypes.number,
  bayScanned: PropTypes.number,
  bayTotal: PropTypes.number,
  handleGoTo: PropTypes.func,
};

merchantsVirtualRow.defaultProps = {
  stockScanned: 0,
  stockTotal: 0,
  bayScanned: 0,
  bayTotal: 0,
  itemKey: null,
  primaryText: '',
  handleGoTo: () => {},
};

export default merchantsVirtualRow;

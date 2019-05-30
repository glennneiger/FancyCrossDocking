import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

// import Icon from 'react-native-vector-icons/MaterialIcons';

/** assets */
import Colors from '../../assets/colors';
import BayIcon from '../svg/BayIcon';
import StockIcon from '../svg/StockIcon';
import CaretBack from '../svg/CaretBack';

const styles = StyleSheet.create({
  buttonInner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    color: Colors.white,
    fontFamily: 'Campton_medium',
  },
  itemRowContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    marginLeft: 10,
  },
});

class BottomTabBar extends PureComponent {
  render() {
    const {
      onPress,
      listType,
    } = this.props;

    console.log('listType', listType);

    return (
      <TouchableOpacity
        style={{ height: 50, backgroundColor: Colors.darkGray1 }}
        onPress={onPress}
      >
        <View style={styles.buttonInner}>
          <View style={styles.itemRowContainer}>
            {
              listType === 'arrowBack' && (
                <CaretBack width={32} height={32} viewBox="0 0 32 32" color={Colors.white} />
              )
            }
            {
              listType === 'To Load' && (
                <BayIcon width={32} height={32} viewBox="0 0 32 32" color={Colors.white} />
              )
            }
            {
              listType === 'In Stock' && (
                <StockIcon width="32" height="32" viewBox="0 0 32 32" color={Colors.white} />
              )
            }
          </View>
          <View style={[styles.itemRowContainer, { width: 200 }]}>
            <Text style={styles.buttonText}>
              {this.props.selectedItem && this.props.selectedItem.toUpperCase()}
            </Text>
          </View>
          <View style={styles.itemRowContainer}>
            <Text style={styles.buttonText}>
              {`${String(this.props.scanned)} ${String.fromCharCode(92)} ${String(this.props.total)}`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

BottomTabBar.defaultProps = {
  onPress: () => {},
  listType: 'arrowBack',
  selectedItem: '',
  scanned: 0,
  total: 0,
};

BottomTabBar.propTypes = {
  listType: PropTypes.string,
  onPress: PropTypes.func,
  selectedItem: PropTypes.string,
  scanned: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  total: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

export default BottomTabBar;

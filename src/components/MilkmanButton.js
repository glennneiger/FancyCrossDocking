import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableHighlight,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

/** assets */
import Colors from '../assets/colors';
import {
  btn as btnStyle,
  btnLabel as btnLabelStyle,
} from '../assets/style';

const styles = StyleSheet.create({
  containerRow: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 70,
    borderWidth: 0.5,
    padding: 8,
  },
});

class MilkmanButton extends PureComponent {
  render() {
    const {
      spinner,
      title,
      onPress,
    } = this.props;

    if (spinner) {
      return <ActivityIndicator size="large" color={Colors.lightGray} />;
    }
    return (
      <TouchableHighlight
        underlayColor={Colors.white}
        style={[btnStyle, { backgroundColor: Colors.darkenTiffany, marginTop: 100 }]}
        onPress={() => onPress()}
      >
        <Text style={[btnLabelStyle, { color: Colors.white }]}>
          {title}
        </Text>
      </TouchableHighlight>
    );
  }
}

// MilkmanButton.propTypes = {
//   item: PropTypes.shape({
//     key: PropTypes.string,
//     externalParcelCode: PropTypes.string,
//     externalTrackingCode: PropTypes.string,
//     parcelCode: PropTypes.string,
//     temporaryParcelCode: PropTypes.string,
//     scanned: PropTypes.bool,
//     selected: PropTypes.bool,
//   }),
// };
//
// MilkmanButton.defaultProps = {
//   item: {},
// };

export default MilkmanButton;

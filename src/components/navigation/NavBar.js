import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View, ViewPropTypes } from 'react-native';
import Colors from '../../assets/colors';
import Fonts from '../../assets/fonts';
import Hamburger from '../svg/Hamburger';
import Constants from '../../mixins/constants';
import ArrowLeft from '../svg/ArrowLeft';

const HEADER_SIZE = 56;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: HEADER_SIZE,
    backgroundColor: Colors.darkenTiffany
  },
  btnIcon: {
    width: HEADER_SIZE,
    height: HEADER_SIZE,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    flex: 1,
    fontFamily: Fonts.medium,
    fontSize: 20,
    color: Colors.white,
  },
  titleWithoutIcon: {
    marginLeft: 20
  },
  rightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  rightText: {
    fontFamily: Fonts.book,
    fontSize: 14,
    color: Colors.lightLightTiffany,
  }
});

class NavBar extends PureComponent {

  renderIcon = () => {
    const { type, onPress, textColor } = this.props;

    switch (type) {
      case Constants.navBarType.openDrawer:
        return (
          <TouchableOpacity style={styles.btnIcon} onPress={onPress}>
            <Hamburger color={textColor} />
          </TouchableOpacity>
        );
      case Constants.navBarType.goBack:
        return (
          <TouchableOpacity style={styles.btnIcon} onPress={onPress}>
            <ArrowLeft color={textColor} />
          </TouchableOpacity>
        );
      case Constants.navBarType.noAction:
      default:
        return null;
    }
  };

  render() {
    const { type, styleContainer, styleTitle, title, rightText } = this.props;
    const hasIcon = type !== Constants.navBarType.noAction;

    return (
      <View style={[styles.container, styleContainer]}>
        {this.renderIcon()}
        <Text
          style={[
            styles.title,
            !hasIcon && styles.titleWithoutIcon,
            styleTitle
          ]}
        >
          {title}
        </Text>
        <View style={styles.rightContainer}>
          <Text style={styles.rightText}>{rightText}</Text>
        </View>
      </View>
    );
  }
}

NavBar.defaultProps = {
  type: Constants.navBarType.openDrawer,
  rightText: '',
  styleContainer: {},
  styleTitle: {},
  color: Colors.darkenTiffany,
  textColor: Colors.white,
  onPress: () => {},
};

NavBar.propTypes = {
  type: PropTypes.oneOf([
    Constants.navBarType.openDrawer,
    Constants.navBarType.goBack,
    Constants.navBarType.noAction
  ]),
  title: PropTypes.string.isRequired,
  rightText: PropTypes.string,
  styleContainer: ViewPropTypes.style,
  styleTitle: Text.propTypes.style,
  color: PropTypes.string,
  textColor: PropTypes.string,
  onPress: PropTypes.func,
};

export default NavBar;

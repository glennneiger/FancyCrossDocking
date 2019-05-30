import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
} from 'react-native';

// import Icon from 'react-native-vector-icons/MaterialIcons';

import { Path } from 'react-native-svg';
import Svg from 'react-native-svg';
import Colors from '../../assets/colors';
import Fonts from '../../assets/fonts';

const styles = StyleSheet.create({
  containerInner: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 4,
  },
  textInput: {
    flex: 1,
    marginLeft: 0,
    marginRight: 15,
    marginBottom: 0,
    backgroundColor: Colors.darkWhite,
    borderRadius: 4,
  },
  textError: {
    flex: 1,
    fontSize: 14,
    fontFamily: Fonts.book,
    padding: 6,
  },
});

class IconInputCustom extends PureComponent {
  render() {
    const {
      textLeft,
      iconColor,
      iconName,
      width,
      height,
      viewBox,
      path,
      defaultValue,
      value,
      passwordMode,
      onChangeText,
      editable,
      placeholder,
      keyboardType,
      errorText,
    } = this.props;

    return (
      <View style={{ height: 100, flexDirection: 'row', marginTop: 10 }}>
        <View style={[styles.iconContainer, { height: 60 }]}>
          {
            iconName === 'user' && (
              <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20 12C20 14.2091 18.2091 16 16 16C13.7909 16 12 14.2091 12 12C12 9.79086 13.7909 8 16 8C18.2091 8 20 9.79086 20 12ZM22 12C22 15.3137 19.3137 18 16 18C12.6863 18 10 15.3137 10 12C10 8.68629 12.6863 6 16 6C19.3137 6 22 8.68629 22 12ZM5.70654 26.7077C5.3157 27.0979 4.68253 27.0974 4.29232 26.7065C3.90211 26.3157 3.90262 25.6825 4.29346 25.2923C6.9385 22.6515 11.2358 21 16 21C20.7642 21 25.0615 22.6515 27.7065 25.2923C28.0974 25.6825 28.0979 26.3157 27.7077 26.7065C27.3175 27.0974 26.6843 27.0979 26.2935 26.7077C24.0948 24.5125 20.3445 23 16 23C11.6555 23 7.90525 24.5125 5.70654 26.7077Z"
                  fill="white"
                />
              </Svg>
            )
          }
          {
            iconName === 'lock' && (
              <Svg width="18" height="21" viewBox="0 0 18 21" fill="none">
                <Path
                  d="M9.96856 14.7502C10.5837 14.4091 11 13.7532 11 13C11 11.8954 10.1046 11 9 11C7.89543 11 7 11.8954 7 13C7 13.7532 7.41634 14.4091 8.03144 14.7502C8.01092 14.8301 8 14.9138 8 15V16C8 16.5523 8.44772 17 9 17C9.55228 17 10 16.5523 10 16V15C10 14.9138 9.98908 14.8301 9.96856 14.7502Z"
                  fill="white"
                />
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 7V4.82051C4 3.62254 4.33427 2.34416 5.30474 1.36763C6.27964 0.386632 7.6083 0 9 0C10.3917 0 11.7204 0.386632 12.6953 1.36763C13.6657 2.34416 14 3.62254 14 4.82051V7H16C17.1046 7 18 7.89543 18 9V19C18 20.1046 17.1046 21 16 21H2C0.89543 21 0 20.1046 0 19V9C0 7.89543 0.895431 7 2 7H4ZM12 7H6V4.82051C6 3.13298 6.92893 2 9 2C11.0711 2 12 3.13298 12 4.82051V7ZM16 9H2L2 19H16V9Z"
                  fill="white"
                />
              </Svg>
            )
          }
          {textLeft
          && (
          <Text style={{ color: iconColor, fontFamily: Fonts.semiBold, fontSize: 16 }}>
            {textLeft}
          </Text>
          )
          }
        </View>
        <View style={{ flex: 3 }}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <TextInput
              keyboardType={keyboardType}
              style={styles.textInput}
              placeholder={placeholder}
              onChangeText={t => onChangeText({ text: t })}
              value={value}
              defaultValue={defaultValue}
              underlineColorAndroid="transparent"
              secureTextEntry={passwordMode}
              editable={editable}
            />
            <Text style={[styles.textError, { color: iconColor }]}>{errorText}</Text>
          </View>
        </View>
      </View>
    );
  }
}


IconInputCustom.defaultProps = {
  passwordMode: false,
  editable: true,
  iconName: null,
  textLeft: null,
  placeholder: '',
  defaultValue: '',
  value: '',
  errorText: '',
  iconColor: Colors.white,
  keyboardType: 'default',
  onChangeText: () => {},
};

IconInputCustom.propTypes = {
  iconName: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  textLeft: PropTypes.string,
  value: PropTypes.string,
  iconColor: PropTypes.string,
  errorText: PropTypes.string,
  keyboardType: PropTypes.string,
  passwordMode: PropTypes.bool,
  onChangeText: PropTypes.func,
  editable: PropTypes.bool,
};

export default IconInputCustom;

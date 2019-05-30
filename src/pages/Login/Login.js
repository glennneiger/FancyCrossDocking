import React from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';

/** component */
import IconInputCustom from '../../components/fields/IconInputCustom';

/** assets && utils */
import {
  container as containerStyle,
  form as formStyle,
  btn as btnStyle,
  btnLabel as btnLabelStyle,
} from '../../assets/style';
import Colors from '../../assets/colors';
import Constants from '../../mixins/constants';

const WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
  logo: {
    height: 77,
    marginTop: 20,
    marginBottom: 25,
  },
  containerOuter1: {
    width: WIDTH,
    alignSelf: 'stretch',
    height: 40,
    marginTop: 20,
    marginBottom: 5,
  },
  containerOuter: {
    width: WIDTH,
    height: 40,
    marginTop: 5,
    marginBottom: 5,
  },
  spinner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

const BTN_LABEL = 'ACCEDI';
const ICON_USERNAME = 'user';
const ICON_PASSWORD = 'lock';
const LOGO = require('../../assets/images/Milkman-Warehouse-Logo.png');

const Login = ({
  username,
  password,
  spinner,
  handleSetState,
  handleLogin,
}) => (
  <View style={[containerStyle, { backgroundColor: Constants.loginColor }]}>
    <View>
      <View style={[formStyle, { alignItems: 'center' }]}>
        <Image
          style={styles.logo}
          source={LOGO}
        />

        {!spinner
          && (
          <IconInputCustom
            placeholder="username"
            iconName={ICON_USERNAME}
            onChangeText={r => handleSetState({ username: r.text })}
            value={username}
            defaultValue={username}
          />
          )
        }
        {!spinner
        && (
        <IconInputCustom
          placeholder="password"
          iconName={ICON_PASSWORD}
          onChangeText={t => handleSetState({ password: t.text })}
          value={password}
          defaultValue={password}
          passwordMode
        />
        )
        }

        {!spinner
        && (
        <TouchableHighlight
          underlayColor={Colors.white}
          style={[btnStyle, { backgroundColor: Colors.darkWhite, marginTop: 100 }]}
          onPress={() => handleLogin({ username, password })}
        >
          <Text style={[btnLabelStyle, { color: Colors.darkenTiffany }]}>
            {BTN_LABEL}
          </Text>
        </TouchableHighlight>
        )
        }
      </View>
    </View>

    {spinner
    && (
    <View style={styles.spinner}>
      <ActivityIndicator
        size={80}
        color={Colors.white}
      />
    </View>
    )
    }
  </View>
);

export default Login;

Login.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  spinner: PropTypes.bool,
  handleSetState: PropTypes.func,
  handleLogin: PropTypes.func,
};

Login.defaultProps = {
  username: null,
  password: null,
  spinner: false,
  handleSetState: () => {},
  handleLogin: () => {},
};

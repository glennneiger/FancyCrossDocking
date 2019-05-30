

import { StyleSheet } from 'react-native';

import Colors from './colors';

const Style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  containerOuter: {
    height: 40,
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  containerOuter1: {
    alignSelf: 'stretch',
    height: 130,
    backgroundColor: Colors.darkGray,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  form: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  btn: {
    position: 'relative',
    left: 0,
    bottom: 0,
    right: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 60,
    height: 50,
    width: 240,
    backgroundColor: '#1FBFBC',
    borderRadius: 25,
  },
  btnLabel: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'campton_semi_bold',
    padding: 15,
  },
});

module.exports = Style;

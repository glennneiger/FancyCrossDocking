import React from 'react';
import PropTypes from 'prop-types';
import { Modal, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import NavBar from './navigation/NavBar';
import Constants from '../mixins/constants';
import Colors from '../assets/colors';
import Fonts from '../assets/fonts';
import Update from './svg/Update';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white
  },
  text: {
    alignSelf: 'stretch',
    fontFamily: Fonts.book,
    marginHorizontal: 25
  },
  message: {
    fontSize: 32,
    paddingTop: 70
  },
  detailMessage: {
    flex: 1,
    fontSize: 16,
    paddingTop: 25
  },
  retryButton: {
    width: 83,
    height: 83,
    marginBottom: 120
  }
});

const ErrorOccurred = (props) => {
  const { visible, color, title, message, detailMessage, onClose, retry, onRetry } = props;

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <NavBar
          title={title}
          type={Constants.navBarType.goBack}
          onPress={onClose}
        />
        <Text style={[styles.text, styles.message, { color }]}>
          {message}
        </Text>
        <Text style={[styles.text, styles.detailMessage, { color }]}>
          {detailMessage}
        </Text>
        <TouchableHighlight
          underlayColor="transparent"
          style={styles.retryButton}
          onPress={onRetry}
        >
          <Update color={color} />
        </TouchableHighlight>
      </View>
    </Modal>
  );
};

ErrorOccurred.defaultProps = {
  color: Colors.pink,
  subMessage: '',
  onClose: () => {},
  onRetry: () => {}
};

ErrorOccurred.propTypes = {
  visible: PropTypes.bool.isRequired,
  color: PropTypes.string,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  subMessage: PropTypes.string,
  onClose: PropTypes.func,
  onRetry: PropTypes.func
};

export default ErrorOccurred;

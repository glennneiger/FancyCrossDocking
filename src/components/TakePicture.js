import React, { Component } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ImageEditor,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import fs from 'react-native-fs';
import PropTypes from 'prop-types';
import Colors from '../assets/colors';
import Constants from '../mixins/constants';
import ArrowLeft from './svg/ArrowLeft';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.darkGray2
  },
  containerPortrait: {
    flexDirection: 'column'
  },
  containerLandscape: {
    flexDirection: 'row'
  },
  arrowBackContainer: {
    flex: 1,
    alignSelf: 'stretch'
  },
  arrowBack: {
    paddingTop: 30,
    paddingLeft: 20
  },
  previewContainer: {
    overflow: 'hidden'
  },
  preview: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinner: {},
  clickButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  clickButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    borderColor: Colors.white,
    borderWidth: 2,
    borderRadius: 40
  },
  clickInnerButton: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: Colors.white
  }
});

class TakePicture extends Component {

  camera = null;

  state = {
    orientation: Constants.orientation.portrait,
    cameraSize: 0,
    isCapturingPhoto: false
  };

  componentWillMount() {
    this.onOrientationChange();
  }

  onOrientationChange = () => {
    const { width, height } = Dimensions.get('window');
    const isPortrait = width <= height;
    this.setState({
      orientation: isPortrait ? Constants.orientation.portrait : Constants.orientation.landscape,
      cameraSize: isPortrait ? width : height
    });
  };

  takePicture = async () => {
    const { isCapturingPhoto } = this.state;
    if (!isCapturingPhoto && this.camera) {
      this.setState({ isCapturingPhoto: true });
      const { onTakePicture, onClear } = this.props;
      const options = { quality: 0.5, base64: true, pauseAfterCapture: true };
      const data = await this.camera.takePictureAsync(options);

      const { width, height } = data;
      let size = 0;
      let offsetX = 0;
      let offsetY = 0;
      if (width < height) {
        size = width;
        offsetX = 0;
        offsetY = (height - width) / 2;
      } else {
        size = height;
        offsetX = (width - height) / 2;
        offsetY = 0;
      }

      const cropData = {
        offset: {
          x: offsetX,
          y: offsetY
        },
        size: {
          width: size,
          height: size
        }
      };

      ImageEditor.cropImage(
        data.uri,
        cropData,
        (uri) => {
          fs.readFile(uri, 'base64').then((base64) => {
            this.setState({ isCapturingPhoto: false });
            onTakePicture({ uri, base64 });
          });
        },
        () => {
          onClear();
        }
      );
    }
  };

  close = () => {
    const { onClear } = this.props;
    this.setState({ isCapturingPhoto: false });
    onClear();
  };

  renderArrowBack = () => {
    const { onClear } = this.props;
    return (
      <View style={styles.arrowBackContainer}>
        <TouchableOpacity style={styles.arrowBack} onPress={onClear}>
          <ArrowLeft />
        </TouchableOpacity>
      </View>
    );
  };

  renderCamera = () => {
    const { orientation, cameraSize, isCapturingPhoto } = this.state;

    let width = 0;
    let height = 0;
    let marginLeft = 0;
    let marginTop = 0;
    switch (orientation) {
      case Constants.orientation.portrait:
        width = cameraSize;
        marginLeft = 0;
        height = cameraSize * (4 / 3);
        marginTop = -cameraSize * (1 / 6);
        break;
      case Constants.orientation.landscape:
        width = cameraSize * (4 / 3);
        marginLeft = -cameraSize * (1 / 6);
        height = cameraSize;
        marginTop = 0;
        break;
      default:
        width = height = cameraSize;
        marginLeft = marginTop = 0;
    }

    return (
      <>
        <View
          style={[styles.previewContainer, {
            width: cameraSize,
            height: cameraSize
          }]}
        >
          <RNCamera
            ref={(cam) => { this.camera = cam; }}
            ratio="4:3"
            style={[
              styles.preview,
              { width, height, marginLeft, marginTop }
            ]}
            type={RNCamera.Constants.Type.back}
          >
            {isCapturingPhoto ? this.renderSpinner() : null}
          </RNCamera>
        </View>
        <View style={styles.clickButtonContainer}>
          <TouchableOpacity style={styles.clickButton} onPress={this.takePicture}>
            <View style={styles.clickInnerButton} />
          </TouchableOpacity>
        </View>
      </>
    );
  };

  renderSpinner = () => (
    <View style={styles.spinner}>
      <ActivityIndicator size="large" color={Colors.lightGray} />
    </View>
  );

  render() {
    const { visible, onClear } = this.props;
    const { orientation } = this.state;

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={onClear}
      >
        <View
          style={[
            styles.container,
            orientation === Constants.orientation.portrait
              ? styles.containerPortrait
              : styles.containerLandscape
          ]}
          onLayout={this.onOrientationChange}
        >
          {this.renderArrowBack()}
          {this.renderCamera()}
        </View>
      </Modal>
    );
  }
}

TakePicture.defaultProps = {
  visible: true,
  onClear: () => {}
};

TakePicture.propTypes = {
  visible: PropTypes.bool,
  onTakePicture: PropTypes.func.isRequired,
  onClear: PropTypes.func
};

export default TakePicture;

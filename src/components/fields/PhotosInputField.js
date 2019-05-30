import React, { PureComponent } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../../assets/colors';
import Camera from '../svg/Camera';
import TakePicture from '../TakePicture';
import PhotoGallery from '../photos/PhotoGallery';

const SIZE = 67;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginRight: -30,
    marginBottom: -30
  },
  element: {
    width: SIZE,
    height: SIZE,
    marginRight: 30,
    marginBottom: 30
  },
  photo: {
    width: SIZE,
    height: SIZE
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: Colors.ultraLightenGray
  }
});

class PhotosInputField extends PureComponent {

  constructor(props) {
    super(props);

    const { initialPhotos, maxPhotos } = props;

    this.state = {
      photos: initialPhotos.slice(0, maxPhotos),
      isTakingPhoto: false,
      isEditingPhotos: false,
      editingSelection: 0,
    };
  }

  /* Actions */

  takePhoto = () => {
    this.setState({ isTakingPhoto: true });
  };

  clearTakingPhoto = () => {
    this.setState({ isTakingPhoto: false });
  };

  onPhotosChange = () => {
    const { onPhotosChange } = this.props;
    const { photos } = this.state;
    onPhotosChange(photos);
  };

  savePhoto = (photo) => {
    const { photos } = this.state;
    this.setState({ isTakingPhoto: false, photos: [...photos, photo] });
    this.onPhotosChange();
  };

  openGallery = (pos) => {
    this.setState({ editingSelection: pos, isEditingPhotos: true });
  };

  closeGallery = (photos) => {
    this.setState({ photos, isEditingPhotos: false });
    this.onPhotosChange();
  };

  renderPhoto = (photo, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => this.openGallery(index)}
      style={styles.element}
    >
      <Image source={photo} style={styles.photo} />
    </TouchableOpacity>
  );

  renderPlaceholder = () => {
    const { maxPhotos } = this.props;
    const { photos } = this.state;
    if (photos.length < maxPhotos) {
      return (
        <TouchableOpacity onPress={this.takePhoto} style={styles.element}>
          <View style={styles.placeholder}>
            <Camera />
          </View>
        </TouchableOpacity>
      );
    }
    return null;
  };

  renderCameraModal = () => {
    const { isTakingPhoto } = this.state;
    return (
      <TakePicture
        visible={isTakingPhoto}
        onTakePicture={this.savePhoto}
        onClear={this.clearTakingPhoto}
      />
    );
  };

  renderGalleryModal = () => {
    const { photos, isEditingPhotos, editingSelection } = this.state;
    return (
      <PhotoGallery
        visible={isEditingPhotos}
        photos={photos}
        initialSelected={editingSelection}
        onClose={this.closeGallery}
      />
    );
  };

  render() {
    const { photos } = this.state;

    return (
      <View style={styles.container}>
        {photos.map(this.renderPhoto)}
        {this.renderPlaceholder()}
        {this.renderCameraModal()}
        {this.renderGalleryModal()}
      </View>
    );
  }
}

PhotosInputField.defaultProps = {
  initialPhotos: [],
  maxPhotos: 3,
  onPhotosChange: () => {},
};

PhotosInputField.propTypes = {
  initialPhotos: PropTypes.arrayOf(PropTypes.object),
  maxPhotos: PropTypes.number,
  onPhotosChange: PropTypes.func
};

export default PhotosInputField;

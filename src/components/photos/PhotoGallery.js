import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native';
import Colors from '../../assets/colors';
import ArrowLeft from '../svg/ArrowLeft';
import Delete from '../svg/Delete';
import CaretRight from '../svg/CaretRight';
import CaretLeft from '../svg/CaretLeft';
import Font from '../../assets/fonts';
import PhotoGallerySwiper from './PhotoGallerySwiper';

const PHOTO_PADDING_HORIZONTAL = 53; // ~80px
const PREVIEW_MARGIN_TOP = 20; // ~30px
const PREVIEW_ITEM_SIZE = 47; // ~70px
const PREVIEW_ITEM_SPACING = 3; // ~5px;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: Colors.darkGray2,
    opacity: 0.9
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56
  },
  headerLeft: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    paddingLeft: 15,
    paddingRight: 15
  },
  itemCounter: {
    fontFamily: Font.medium,
    fontSize: 16, // ~24px
    color: Colors.white
  },
  deleteIcon: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    paddingLeft: 15,
    paddingRight: 15
  },
  gallery: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  galleryArrow: {
    justifyContent: 'center',
    alignItems: 'center',
    width: PHOTO_PADDING_HORIZONTAL,
    zIndex: 2
  },
  preview: {
    marginTop: PREVIEW_MARGIN_TOP,
    height: PREVIEW_ITEM_SIZE
  },
  previewItem: {
    width: PREVIEW_ITEM_SIZE,
    height: PREVIEW_ITEM_SIZE,
    marginHorizontal: PREVIEW_ITEM_SPACING
  },
  previewImage: {
    width: PREVIEW_ITEM_SIZE,
    height: PREVIEW_ITEM_SIZE
  },
  previewImageSelected: {
    borderWidth: 2,
    borderColor: Colors.white
  }
});

class PhotoGallery extends Component {

  gallery = null;
  photoSize = 0;

  constructor(props) {
    super(props);

    const { width } = Dimensions.get('window');
    this.photoSize = width - 2 * PHOTO_PADDING_HORIZONTAL;
  }

  state = {
    visible: false,
    photos: [],
    selected: 0
  };

  static getDerivedStateFromProps(props, state) {
    if (props.visible !== state.visible) {
      const { visible, photos, initialSelected } = props;
      return {
        visible,
        photos,
        selected: initialSelected
      };
    }
    return null;
  }

  /* Actions */

  closeGallery = () => {
    const { onClose } = this.props;
    const { photos } = this.state;
    onClose(photos);
  };

  changePhoto = (pos) => {
    this.setState({ selected: pos });
  };

  goToPhotoAtPos = (pos) => {
    this.changePhoto(pos);
    this.gallery.goToPhoto(pos);
  };

  goToPrevPhoto = () => {
    const { selected } = this.state;
    if (selected > 0) {
      this.changePhoto(selected - 1);
      this.gallery.goToPhoto(selected - 1);
    }
  };

  goToNextPhoto = () => {
    const { photos, selected } = this.state;
    if (selected < photos.length - 1) {
      this.changePhoto(selected + 1);
      this.gallery.goToPhoto(selected + 1);
    }
  };

  deleteSelectedPhoto = () => {
    const { photos, selected } = this.state;

    const newPhotos = [...photos.filter((photo, index) => index !== selected)];
    // const newSelected = Math.min(selected, newPhotos.length - 1);

    this.setState({
      photos: []
    });

    this.setState({
      photos: newPhotos
    });

    if (newPhotos.length === 0) {
      const { onClose } = this.props;
      onClose([]);
    }
  };

  /* Renders */

  renderHeader = () => {
    const { photos, selected } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.backIcon} onPress={this.closeGallery}>
              <ArrowLeft />
            </TouchableOpacity>
            <Text style={styles.itemCounter}>
              {`${selected + 1} di ${photos.length}`}
            </Text>
          </View>
          <TouchableOpacity style={styles.deleteIcon} onPress={this.deleteSelectedPhoto}>
            <Delete color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderGallerySwiper = () => {
    const { photos } = this.state;
    const { initialSelected } = this.props;
    return (
      <PhotoGallerySwiper
        ref={(ref) => { this.gallery = ref; }}
        photos={photos}
        photoSize={this.photoSize}
        initialPage={initialSelected}
        onPhotoChange={this.changePhoto}
      />
    );
  };

  renderGalleryLeftArrow = () => {
    const { photos, selected } = this.state;

    const isVisible = photos.length > 1;
    const isEnabled = selected > 0;

    return (
      <TouchableOpacity
        style={styles.galleryArrow}
        onPress={isEnabled ? this.goToPrevPhoto : null}
      >
        {/* NOTE: this <View> is necessary due to a bug of TouchableOpacity with opacity style */}
        <View style={{ opacity: isEnabled ? 1 : 0.3 }}>
          {isVisible ? <CaretLeft color={Colors.white} /> : null}
        </View>
      </TouchableOpacity>
    );
  };

  renderGalleyRightArrow = () => {
    const { photos, selected } = this.state;

    const isVisible = photos.length > 1;
    const isEnabled = selected < photos.length - 1;

    return (
      <TouchableOpacity
        style={styles.galleryArrow}
        onPress={isEnabled ? this.goToNextPhoto : null}
      >
        {/* NOTE: this <View> is necessary due to a bug of TouchableOpacity with opacity style */}
        <View style={{ opacity: isEnabled ? 1 : 0.3 }}>
          {isVisible ? <CaretRight color={Colors.white} /> : null}
        </View>
      </TouchableOpacity>
    );
  };

  renderGallery = () => (
    <View style={[styles.gallery, { height: this.photoSize }]}>
      {this.renderGalleryLeftArrow()}
      {this.renderGallerySwiper()}
      {this.renderGalleyRightArrow()}
    </View>
  );

  renderPreviewItem = (photo, index) => {
    const { selected } = this.state;
    const isSelected = index === selected;

    return (
      <TouchableOpacity
        key={index}
        style={styles.previewItem}
        onPress={() => this.goToPhotoAtPos(index)}
      >
        <Image
          source={photo}
          style={[
            styles.previewImage,
            isSelected && styles.previewImageSelected
          ]}
        />
      </TouchableOpacity>
    );
  };

  renderPreview = () => {
    const { photos } = this.state;

    return (
      <View style={{ flex: 1, alignSelf: 'center' }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.preview}
        >
          {photos.map(this.renderPreviewItem)}
        </ScrollView>
      </View>
    );
  };

  render() {
    const { visible } = this.state;

    return (
      <Modal
        transparent
        animationType="fade"
        visible={visible}
        onRequestClose={this.closeGallery}
      >
        <View style={styles.backdrop} />
        <View style={styles.container}>
          {this.renderHeader()}
          {this.renderGallery()}
          {this.renderPreview()}
        </View>
      </Modal>
    );
  }
}

PhotoGallery.defaultProps = {
  initialSelected: 0,
  onClose: () => {}
};

PhotoGallery.propTypes = {
  visible: PropTypes.bool.isRequired,
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  initialSelected: PropTypes.number,
  onClose: PropTypes.func
};

export default PhotoGallery;

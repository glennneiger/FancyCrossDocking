import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, View } from 'react-native';
import ViewPager from '@react-native-community/viewpager';

export const PHOTO_PADDING_HORIZONTAL = 53;

const styles = StyleSheet.create({
  swiper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 1
  },
  photoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: PHOTO_PADDING_HORIZONTAL
  }
});

class PhotoGallerySwiper extends Component {

  swiper = null;

  shouldComponentUpdate(nextProps) {
    const { photos } = this.props;
    const newPhotos = nextProps.photos;

    if (photos.length === newPhotos.length) {
      return false;
    }

    for (let index = 0; index < photos.length; index++) {
      if (photos[index] !== newPhotos[index]) {
        return true;
      }
    }

    return false;
  }

  goToPhoto(pos) {
    this.swiper.setPage(pos);
  }

  render() {
    const { photos, photoSize, initialPage, onPhotoChange } = this.props;

    return (
      <ViewPager
        ref={(swiper) => { this.swiper = swiper; }}
        style={styles.swiper}
        initialPage={initialPage}
        onPageSelected={e => onPhotoChange(e.nativeEvent.position)}
      >
        {photos.map(
          (photo, index) => (
            <View key={index} style={styles.photoContainer}>
              <Image source={photo} style={{ width: photoSize, height: photoSize }} />
            </View>
          )
        )}
      </ViewPager>
    );
  }
}

PhotoGallerySwiper.defaultProps = {
  initialPage: 0,
  onPhotoChange: () => {}
};

PhotoGallerySwiper.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  photoSize: PropTypes.number.isRequired,
  initialPage: PropTypes.number,
  onPhotoChange: PropTypes.func
};

export default PhotoGallerySwiper;

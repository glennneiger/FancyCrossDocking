import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Colors from '../../assets/colors';
import ArrowLeft from '../svg/ArrowLeft';
import CaretRight from '../svg/CaretRight';
import CaretLeft from '../svg/CaretLeft';
import Font from '../../assets/fonts';
import PhotoGallerySwiper from './PhotoGallerySwiper';

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
    backgroundColor: Colors.darkenGray,
    opacity: 0.95
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
  title: {
    fontFamily: Font.medium,
    fontSize: 16,
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
    width: 50,
    zIndex: 2
  },
  details: {
    flex: 1,
    marginHorizontal: 50,
  },
  detailsLabel: {
    fontFamily: Font.book,
    color: Colors.white,
    fontSize: 12,
    lineHeight: 14,
    marginTop: 10
  },
  detailsValue: {
    fontFamily: Font.book,
    color: Colors.white,
    fontSize: 14,
    lineHeight: 17,
    marginTop: 5
  }
});

class PhotoGalleryWithDetails extends Component {

  gallery = null;
  photoSize = 0;

  constructor(props) {
    super(props);

    const { width } = Dimensions.get('window');
    this.photoSize = width - 100;
  }

  state = {
    visible: false,
    photos: [],
    selected: 0
  };

  static getDerivedStateFromProps(props, state) {
    if (props.visible !== state.visible) {
      const { visible, photos } = props;
      return {
        visible,
        photos
      };
    }
    return null;
  }

  // static getDerivedStateFromProps(props, state) {
  //   if (props.visible !== state.visible) {
  //     const { visible, photos, initialSelected } = props;
  //     return {
  //       visible,
  //       photos,
  //       selected: initialSelected
  //     };
  //   }
  //   return null;
  // }

  /* Actions */

  closeGallery = () => {
    const { onClose } = this.props;
    const { photos } = this.state;
    onClose(photos);
  };

  changePhoto = (pos) => {
    this.setState({ selected: pos });
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

  /* Renders */

  renderHeader = () => (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backIcon} onPress={this.closeGallery}>
            <ArrowLeft />
          </TouchableOpacity>
          <Text style={styles.title}>Dettaglio pacco</Text>
        </View>
      </View>
    </View>
  );

  renderGallerySwiper = () => {
    const { photos } = this.state;
    return (
      <PhotoGallerySwiper
        ref={(ref) => { this.gallery = ref; }}
        photos={photos}
        photoSize={this.photoSize}
        initialPage={0}
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

  renderDetails = () => {
    const { firstScan, lastScan } = this.props;

    return (
      <View style={styles.details}>
        { firstScan ? <Text style={styles.detailsLabel}>Prima scansione</Text> : null }
        { firstScan ? <Text style={styles.detailsValue}>{firstScan}</Text> : null }
        { lastScan ? <Text style={styles.detailsLabel}>Ultima scansione</Text> : null }
        { lastScan ? <Text style={styles.detailsValue}>{lastScan}</Text> : null }
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
          {this.renderDetails()}
        </View>
      </Modal>
    );
  }
}

PhotoGalleryWithDetails.defaultProps = {
  firstScan: '',
  lastScan: '',
  onClose: () => {}
};

PhotoGalleryWithDetails.propTypes = {
  visible: PropTypes.bool.isRequired,
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  firstScan: PropTypes.string,
  lastScan: PropTypes.string,
  onClose: PropTypes.func
};

export default PhotoGalleryWithDetails;

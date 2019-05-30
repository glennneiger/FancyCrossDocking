import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableHighlight, View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../../../assets/colors';
import Fonts from '../../../assets/fonts';
import Constants from '../../../mixins/constants';
import { btn as btnStyle, btnLabel as btnLabelStyle } from '../../../assets/style';
import PhotosInputField from '../../../components/fields/PhotosInputField';
import NavBar from '../../../components/navigation/NavBar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: Colors.white,
  },
  fields: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 25,
  },
  labelText: {
    fontFamily: Fonts.book,
    fontSize: 16,
    lineHeight: 18,
    paddingTop: 20,
    color: Colors.tiffany,
  },
  photosContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 10
  },
  textField: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: Colors.lightGray,
    fontFamily: Fonts.book,
    fontSize: 16,
    color: Colors.darkGray1,
    height: 45
  },
  location: {
    width: 150
  },
  notes: {
    height: 80
  },
  confirmButton: {
    backgroundColor: Colors.lightGray,
    marginTop: 25,
    marginBottom: 20,
  },
  confirmButtonActive: {
    backgroundColor: Colors.darkenTiffany,
  }
});

const labelParcelPhotos = 'Foto del pacco*';
const labelLocation = 'Ubicazione*';
const labelLocationPlaceholder = 'es. A-06';
const labelNotes = 'Note';
const labelNotesPlaceholder = 'Dicci di più su questo pacco...';
const labelConfirmButton = 'CONFERMA I DATI';

class Step2 extends Component {

  state = {
    focusOnNotes: false,
    focusOnLocation: false,
    photos: [],
    location: '',
    notes: ''
  };

  onConfirmData = () => {
    const { confirmData } = this.props;
    const { photos, location, notes } = this.state;
    confirmData({ photos, location, notes });
  };

  renderPhotos() {
    const { photos, focusOnNotes, focusOnLocation } = this.state;

    if (focusOnNotes || focusOnLocation) {
      return null;
    }

    return (
      <>
        <Text style={styles.labelText}>
          {labelParcelPhotos}
        </Text>
        <View style={styles.photosContainer}>
          <PhotosInputField
            initialPhotos={photos}
            maxPhotos={2}
            onPhotosChange={newPhotos => this.setState({ photos: newPhotos })}
          />
        </View>
      </>
    );
  }

  renderLocation() {
    const { location, focusOnNotes } = this.state;

    if (focusOnNotes) {
      return null;
    }

    return (
      <>
        <Text style={styles.labelText}>
          {labelLocation}
        </Text>
        <TextInput
          editable
          keyboardType="default"
          placeholder={labelLocationPlaceholder}
          placeholderTextColor={Colors.lightGray}
          value={location}
          style={[styles.textField, styles.location]}
          onFocus={() => this.setState({ focusOnLocation: true })}
          onBlur={() => this.setState({ focusOnLocation: false })}
          underlineColorAndroid="transparent"
          onChangeText={text => this.setState({ location: text })}
        />
      </>
    );
  }

  renderNotes() {
    const { notes, focusOnLocation } = this.state;

    if (focusOnLocation) {
      return null;
    }

    return (
      <>
        <Text style={styles.labelText}>
          {labelNotes}
        </Text>
        <TextInput
          editable
          multiline
          keyboardType="default"
          textAlignVertical="top"
          placeholder={labelNotesPlaceholder}
          placeholderTextColor={Colors.lightGray}
          value={notes}
          style={[styles.textField, styles.notes]}
          onFocus={() => this.setState({ focusOnNotes: true })}
          onBlur={() => this.setState({ focusOnNotes: false })}
          underlineColorAndroid="transparent"
          onChangeText={text => this.setState({ notes: text })}
        />
      </>
    );
  }

  renderButton() {
    const { photos, location, focusOnNotes, focusOnLocation } = this.state;

    if (focusOnNotes || focusOnLocation) {
      return null;
    }

    const isButtonClickable = photos.length && location;

    return (
      <TouchableHighlight
        underlayColor={Colors.white}
        style={[btnStyle, styles.confirmButton, isButtonClickable && styles.confirmButtonActive]}
        onPress={isButtonClickable ? this.onConfirmData : null}
      >
        <Text style={btnLabelStyle}>
          {labelConfirmButton}
        </Text>
      </TouchableHighlight>
    );
  }

  render() {
    const { goBack } = this.props;

    return (
      <View style={styles.container}>
        <NavBar
          title={Constants.routeName.createParcelStep2}
          type={Constants.navBarType.goBack}
          onPress={goBack}
        />
        <ScrollView contentContainerStyle={styles.fields}>
          {this.renderPhotos()}
          {this.renderLocation()}
          {this.renderNotes()}
        </ScrollView>
        {this.renderButton()}
      </View>
    );
  }
}

Step2.propTypes = {
  goBack: PropTypes.func.isRequired,
  confirmData: PropTypes.func.isRequired
};

export default Step2;

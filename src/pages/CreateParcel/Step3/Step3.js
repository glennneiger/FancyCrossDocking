import React from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../../../assets/colors';
import Fonts from '../../../assets/fonts';
import { btn as btnStyle, btnLabel as btnLabelStyle } from '../../../assets/style';
import NavBar from '../../../components/navigation/NavBar';
import Constants from '../../../mixins/constants';
import ErrorOccurred from '../../../components/ErrorOccurred';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  fields: {
    flex: 1,
    paddingHorizontal: 15
  },
  labelText: {
    fontFamily: Fonts.book,
    fontSize: 16,
    lineHeight: 19,
    paddingTop: 20,
    color: Colors.tiffany
  },
  valueText: {
    fontFamily: Fonts.semiBold,
    fontSize: 24,
    lineHeight: 29,
    paddingRight: 10,
    color: Colors.darkenTiffany,
    marginTop: 10
  },
  confirmButton: {
    backgroundColor: Colors.darkenTiffany,
    marginTop: 100,
    marginBottom: 20
  }
});

const labelMilkname = 'Milkname';
const labelParcelCode = 'Codice pacco';
const labelLocation = 'Ubicazione';
const labelConfirmButton = 'CONFERMA I DATI';

const Step3 = (props) => {

  const {
    goBack,
    confirmData,
    milkname,
    parcel,
    location,
    error,
    errorColor,
    errorMessage,
    onErrorClose,
    onErrorRetry
  } = props;

  const renderErrorModal = () => (
    <ErrorOccurred
      visible={error}
      color={errorColor}
      title="Errore"
      message={errorMessage}
      detailMessage="Riprova"
      onClose={onErrorClose}
      onRetry={onErrorRetry}
    />
  );

  const renderPage = () => (
    <View style={styles.container}>
      <NavBar
        title={Constants.routeName.createParcelStep3}
        type={Constants.navBarType.goBack}
        onPress={goBack}
      />
      <View style={styles.fields}>
        <Text style={styles.labelText}>
          {labelMilkname}
        </Text>
        <Text style={styles.valueText}>
          {milkname || '-'}
        </Text>
        <Text style={styles.labelText}>
          {labelParcelCode}
        </Text>
        <Text style={styles.valueText}>
          {parcel || '-'}
        </Text>
        <Text style={styles.labelText}>
          {labelLocation}
        </Text>
        <Text style={styles.valueText}>
          {location || '-'}
        </Text>
      </View>
      <TouchableHighlight
        underlayColor={Colors.white}
        style={[btnStyle, styles.confirmButton]}
        onPress={confirmData}
      >
        <Text style={btnLabelStyle}>
          {labelConfirmButton}
        </Text>
      </TouchableHighlight>
    </View>
  );

  return (
    <>
      {renderPage()}
      {renderErrorModal()}
    </>
  );
};

Step3.propTypes = {
  goBack: PropTypes.func.isRequired,
  confirmData: PropTypes.func.isRequired,
  milkname: PropTypes.string.isRequired,
  parcel: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  errorColor: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  onErrorClose: PropTypes.func.isRequired,
  onErrorRetry: PropTypes.func.isRequired
};

export default Step3;

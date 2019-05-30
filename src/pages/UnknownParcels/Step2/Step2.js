import React from 'react';
import {
  StyleSheet, Text, TextInput, TouchableHighlight, View,
} from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../../../assets/colors';
import Fonts from '../../../assets/fonts';
import {
  btn as btnStyle,
  btnLabel as btnLabelStyle,
} from '../../../assets/style';
import ErrorOccurred from '../../../components/ErrorOccurred';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.white,
  },
  labelText: {
    fontFamily: Fonts.book,
    fontSize: 18,
    marginLeft: 15,
    paddingTop: 20,
    paddingRight: 10,
    color: Colors.tiffany,
  },
  valueText: {
    fontFamily: Fonts.semiBold,
    fontSize: 20,
    marginLeft: 15,
    paddingTop: 10,
    paddingRight: 10,
    color: Colors.darkenTiffany,
  },
  inputOuter: {
    marginTop: 2,
    marginLeft: 12,
    marginRight: 12,
    padding: 2,
    backgroundColor: Colors.lightenGray,
  },
  notes: {
    fontFamily: Fonts.book,
    fontSize: 18,
  },
});

const BTN_LABEL = 'CONFERMA I DATI';
const labelParcel = 'Pacco';
const labelMerchant = 'Merchant';
const labelNote = 'Note';

const Step2 = (props) => {

  const {
    showBtn,
    parcel,
    merchantName,
    input,
    handleSetState,
    handleConfirmData,
    error,
    errorColor,
    errorMessage,
    onErrorClose,
    onErrorRetry
  } = props;

  const renderPage = () => (
    <View style={styles.container}>
      {
        showBtn && (
          <View>
            <Text style={styles.labelText}>
              {labelParcel}
            </Text>
            <Text style={styles.valueText}>
              {parcel || '-'}
            </Text>
            <Text style={styles.labelText}>
              {labelMerchant}
            </Text>
            <Text style={styles.valueText}>
              {merchantName || '-'}
            </Text>
          </View>
        )
      }
      <Text style={styles.labelText}>
        {labelNote}
      </Text>
      <View style={styles.inputOuter}>
        <TextInput
          // multiline
          // autoFocus
          // numberOfLines={4}
          editable
          keyboardType="default"
          placeholder="Dicci di più sul pacco ignoto"
          placeholderTextColor={Colors.lightGray}
          value={input}
          style={styles.textInput}
          onFocus={() => handleSetState({ showBtn: false })}
          onBlur={() => handleSetState({ showBtn: true })}
          underlineColorAndroid="transparent"
          onChangeText={t => handleSetState({ input: t })}
        />
      </View>

      {
        showBtn && (
          <TouchableHighlight
            underlayColor={Colors.white}
            style={[btnStyle, { backgroundColor: Colors.darkenTiffany, marginTop: 100 }]}
            onPress={handleConfirmData}
          >
            <Text style={[btnLabelStyle, { color: Colors.white }]}>
              {BTN_LABEL}
            </Text>
          </TouchableHighlight>
        )
      }
    </View>
  );

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

  return (
    <>
      {renderPage()}
      {renderErrorModal()}
    </>
  );
};

Step2.propTypes = {
  showBtn: PropTypes.bool.isRequired,
  parcel: PropTypes.string.isRequired,
  merchantName: PropTypes.string.isRequired,
  input: PropTypes.string.isRequired,
  handleSetState: PropTypes.func.isRequired,
  handleConfirmData: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  errorColor: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  onErrorClose: PropTypes.func.isRequired,
  onErrorRetry: PropTypes.func.isRequired
};

export default Step2;

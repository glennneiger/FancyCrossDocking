import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import NavBar from '../../../components/navigation/NavBar';
import FilteredList from '../../../components/FilteredList';
import Constants from '../../../mixins/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
});

const Step0 = (props) => {
  const { openDrawer, retrieveData, handleSelectItem } = props;

  return (
    <View style={styles.container}>
      <NavBar
        title={Constants.routeName.unknownParcelStep0}
        onPress={openDrawer}
      />
      <FilteredList
        searchPlaceholder="Di che merchant è il pacco?"
        noResultText="Nessun merchant trovato"
        retrieveData={retrieveData}
        handleSelectItem={handleSelectItem}
      />
    </View>
  );
};

Step0.propTypes = {
  openDrawer: PropTypes.func.isRequired,
  retrieveData: PropTypes.func.isRequired,
  handleSelectItem: PropTypes.func.isRequired
};

export default Step0;

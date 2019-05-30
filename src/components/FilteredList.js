import React, { Component } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../assets/colors';
import Fonts from '../assets/fonts';
import Find from './svg/Find';
import AddLetter from './svg/AddLetter';
import NameNotFound from './svg/NameNotFound';
import Cancel from './svg/Cancel';
import FailedSearch from './svg/FailedSearch';
import Update from './svg/Update';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: Colors.white,
    paddingVertical: 20,
    paddingHorizontal: 15
  },
  searchField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 35,
    borderRadius: 6,
    backgroundColor: Colors.ultraLightenGray,
  },
  searchFieldIcon: {
    paddingLeft: 16
  },
  searchFieldCancel: {
    paddingRight: 12
  },
  searchFieldText: {
    flex: 1,
    fontFamily: Fonts.book,
    fontSize: 14
  },
  list: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  itemCount: {
    paddingTop: 20,
    paddingLeft: 15,
    paddingBottom: 5,
    color: Colors.darkenTiffany
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 47,
    paddingLeft: 35,
    borderTopWidth: 2,
    borderTopColor: Colors.lightenGray
  },
  listItemText: {
    fontSize: 16,
    fontFamily: Fonts.book,
    color: Colors.darkGray1
  },
  listItemHighlighted: {
    fontSize: 16,
    fontFamily: Fonts.book,
    color: Colors.tiffany
  },
  message: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  messageText: {
    marginTop: 15,
    fontSize: 16,
    fontFamily: Fonts.book,
    color: Colors.lightGray
  },
  spinner: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshPageButton: {
    marginTop: 25
  }
});

class FilteredList extends Component {

  state = {
    filter: '',
    lastRetrieveFilter: '',
    retrievedItems: [],
    filteredItems: [],
    isLoadingList: false,
    error: false
  };

  /* Actions */

  filterList = async (filter) => {

    this.setState({ filter });
    const { isLoadingList } = this.state;

    if (isLoadingList) {
      return;
    }

    if (!filter || filter.length < 3) {
      this.setState({ filteredItems: [] });
      return;
    }

    const { lastRetrieveFilter, retrievedItems } = this.state;
    const { retrieveData } = this.props;

    let items;
    const retrieveFilter = filter.slice(0, 3);
    if (retrieveFilter !== lastRetrieveFilter) {
      this.setState({ isLoadingList: true });
      items = await retrieveData(retrieveFilter);
      if (items === null) {
        this.setState({ error: true, isLoadingList: false, filteredItems: [] });
        return;
      }
    } else {
      items = retrievedItems;
    }

    const filteredItems = items.filter(
      i => i.title.toUpperCase().startsWith(filter.toUpperCase()),
    );
    this.setState({
      isLoadingList: false,
      lastRetrieveFilter: retrieveFilter,
      retrievedItems: items,
      filteredItems,
    });
  };

  resetFilter = () => {
    this.setState({
      filter: '',
      filteredItems: []
    });
  };

  selectItem = (selectedItem) => {
    const { handleSelectItem } = this.props;
    this.resetFilter();
    handleSelectItem(selectedItem);
  };

  refresh = () => {
    this.setState({
      error: false,
      filter: '',
      lastRetrieveFilter: '',
      retrievedItems: [],
      filteredItems: [],
      isLoadingList: false,
    });
  };

  /* Renders */

  renderSearchField = () => {
    const { searchPlaceholder } = this.props;
    const { error, filter } = this.state;
    return (
      <View style={styles.searchField}>
        <View style={styles.searchFieldIcon}>
          <Find />
        </View>
        <TextInput
          keyboardType="default"
          style={styles.searchFieldText}
          placeholder={searchPlaceholder}
          placeholderTextColor={Colors.darkGray}
          clearTextOnFocus
          value={filter}
          underlineColorAndroid="transparent"
          editable={!error}
          onChangeText={this.filterList}
        />
        <TouchableOpacity disabled={error} onPress={this.resetFilter}>
          <View style={styles.searchFieldCancel}>
            <Cancel />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  renderSpinner = () => (
    <View style={styles.spinner}>
      <ActivityIndicator size="large" color={Colors.lightGray} />
    </View>
  );

  renderListItem = ({ item }) => {
    const { filter } = this.state;
    const { title } = item;

    return (
      <TouchableOpacity onPress={() => this.selectItem(item)}>
        <View style={styles.listItem}>
          <Text style={styles.listItemHighlighted}>{title.slice(0, filter.length)}</Text>
          <Text style={styles.listItemText}>{title.slice(filter.length)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderItemCount = () => {
    const { filteredItems } = this.state;
    const itemCount = filteredItems.length;

    return (
      <View style={styles.itemCount}>
        <Text>
          {itemCount}
          {itemCount === 1 ? ' risultato' : ' risultati'}
        </Text>
      </View>
    );
  };

  renderList = () => {
    const { error, filter, filteredItems } = this.state;
    const { noResultText } = this.props;

    if (error) {
      return (
        <View style={styles.message}>
          <FailedSearch />
          <Text style={[styles.messageText, { textAlign: 'center' }]}>
            {'Ricerca fallita\nAggiorna la pagina'}
          </Text>
          <TouchableOpacity style={styles.refreshPageButton} onPress={this.refresh}>
            <Update color={Colors.yellow} />
          </TouchableOpacity>
        </View>
      );
    }

    if (filter.length < 3) {
      return (
        <View style={styles.message}>
          <AddLetter />
          <Text style={styles.messageText}>Scrivi almeno 3 lettere</Text>
        </View>
      );
    }

    if (filteredItems.length === 0) {
      return (
        <View style={styles.message}>
          <NameNotFound />
          <Text style={styles.messageText}>{noResultText}</Text>
        </View>
      );
    }

    return (
      <>
        {this.renderItemCount()}
        <FlatList
          data={filteredItems}
          renderItem={this.renderListItem}
        />
      </>
    );
  };

  render() {
    const { isLoadingList } = this.state;

    return (
      <View style={styles.container}>
        {this.renderSearchField()}
        <View style={styles.list}>
          {isLoadingList ? this.renderSpinner() : this.renderList()}
        </View>
      </View>
    );
  }
}

FilteredList.propTypes = {
  searchPlaceholder: PropTypes.string.isRequired,
  noResultText: PropTypes.string.isRequired,
  retrieveData: PropTypes.func.isRequired,
  handleSelectItem: PropTypes.func.isRequired
};

export default FilteredList;

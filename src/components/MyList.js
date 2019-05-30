import React, { PureComponent } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
} from 'react-native';

/** components */
import VirtualRow from './VirtualRow';

/** assets */
import Colors from '../assets/colors';

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    height: 50,
    backgroundColor: Colors.white,
  },
});

class MyList extends PureComponent {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem = (list) => {
    const { handleOpenDetails } = this.props;
    const { item } = list;

    if (item.selected) {
      return null;
    }

    let secondaryText = '';
    let loadingArea = null;
    if (item.loadingArea && item.position) {
      loadingArea = `${item.loadingArea.substring(3)}.${item.position}`;
    }
    if (item.externalParcelCode) {
      secondaryText = item.externalParcelCode;
    } else if (item.parcelCode) {
      secondaryText = item.parcelCode;
    } else {
      secondaryText = item.temporaryParcelCode;
    }

    const showDetails = !!(
      (item.uriImages && item.uriImages.length)
      || item.firstScan
      || item.lastScan
    );

    return (
      <VirtualRow
        itemKey={item.key}
        primaryText={item.externalTrackingCode}
        secondaryText={secondaryText}
        optional1Text={loadingArea}
        optional2Text={item.driver || null}
        scanned={item.scanned}
        showDetails={showDetails}
        handleOpenDetails={() => handleOpenDetails(item)}
      />
    );
  };

  render() {
    return (
      <View style={styles.listContainer}>
        <FlatList
          onRefresh={this.props.onRefresh}
          refreshing={this.props.refreshing}
          data={this.props.list}
          renderItem={this.renderItem}
          initialNumToRender={4}
        />
      </View>
    );
  }
}

export default MyList;

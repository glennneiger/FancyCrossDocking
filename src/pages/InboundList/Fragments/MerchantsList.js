import React, { PureComponent } from 'react';
import {
  FlatList,
} from 'react-native';

/** components */
import MerchantsVirtualRow from './MerchantsVirtualRow';

class MerchantsList extends PureComponent {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem = (list) => {
    const {
      item,
    } = list;
    return (
      <MerchantsVirtualRow
        itemKey={item.key}
        handleGoTo={this.props.handleGoTo}
        stockScanned={item.stockScanned}
        stockTotal={item.stockTotal}
        bayScanned={item.bayScanned}
        bayTotal={item.bayTotal}
        primaryText={item.label}
      />
    );
  };

  render() {
    return (
      <FlatList
        onRefresh={this.props.onRefresh}
        refreshing={this.props.refreshing}
        data={this.props.list}
        renderItem={this.renderItem}
      />
    );
  }
}

export default MerchantsList;

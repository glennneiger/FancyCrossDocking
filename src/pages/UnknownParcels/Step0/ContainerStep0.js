import React, { Component } from 'react';
import { orderBy } from 'lodash';
import { storageGetItem } from '../../../mixins/Utils';
import { getAsyncData } from '../../../mixins/AsyncUtils';

import Constants from '../../../mixins/constants';
import withOpenDrawer from '../../../hoc/withOpenDrawer';
import Step0 from './Step0';

class ContainerStep0 extends Component {

  merchants = null;

  retrieveData = async () => {
    if (this.merchants === null) {

      const wmId = await storageGetItem('wmId');
      const data = await getAsyncData(Constants.merchantUrl, {
        wmId: Number(wmId)
      });

      if (data.success) {
        const newList = data.merchants.map(merchant => ({
          title: merchant.name,
          id: merchant.id,
          key: `${merchant.name}-${merchant.id}`,
        }));

        if (Object.keys(newList)) {
          this.merchants = orderBy(newList, [c => c.title.toLowerCase()], ['asc']);
        }
      }
    }

    return this.merchants;
  };

  navigateToNextScreen = (item) => {
    const { navigation: { navigate } } = this.props;

    navigate(Constants.routeName.unknownParcelStep1, {
      merchantId: item.id,
      merchantName: item.title
    });
  };

  render() {
    const { navigation: { openDrawer } } = this.props;

    return (
      <Step0
        openDrawer={openDrawer}
        retrieveData={this.retrieveData}
        handleSelectItem={this.navigateToNextScreen}
      />
    );
  }
}

export default withOpenDrawer(
  ContainerStep0,
);

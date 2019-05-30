import React, { Component } from 'react';
import { orderBy } from 'lodash';
import { storageGetItem } from '../../../mixins/Utils';
import { getAsyncData } from '../../../mixins/AsyncUtils';
import Constants from '../../../mixins/constants';
import Step0 from './Step0';

export default class ContainerStep0 extends Component {

  retrieveData = async (retrieveFilter) => {
    const wmId = await storageGetItem('wmId');
    const data = await getAsyncData(Constants.milknamesUrl, {
      wmId: Number(wmId),
      contains: retrieveFilter,
    });

    if (!data.success) {
      return null;
    }

    const newList = data.milknames.map((milkname, index) => ({
      title: milkname,
      id: milkname,
      key: `${milkname}-${index}`,
    }));

    if (Object.keys(newList)) {
      return orderBy(newList, [c => c.title.toLowerCase()], ['asc']);
    }

    return [];
  };

  navigateToNextScreen = (item) => {
    const { navigation: { navigate } } = this.props;
    console.log(item);

    navigate(Constants.routeName.createParcelStep1, {
      milkname: item.id
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

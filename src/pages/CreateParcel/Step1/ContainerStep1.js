import React, { Component } from 'react';
import Step1 from './Step1';
import Const from '../../../mixins/constants';

export default class ContainerStep1 extends Component {

  navigateToNextScreen = (barcode) => {
    const { navigation: { navigate, state: { params } } } = this.props;
    navigate(Const.routeName.createParcelStep2, {
      parcel: barcode,
      ...params,
    });
  };

  navigateBack = () => {
    const { navigation: { goBack } } = this.props;
    goBack();
  };

  render() {
    return (
      <Step1
        goBack={this.navigateBack}
        navigateToNextScreen={this.navigateToNextScreen}
      />
    );
  }
}

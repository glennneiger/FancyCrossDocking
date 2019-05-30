import React, { Component } from 'react';
import Step2 from './Step2';
import Constants from '../../../mixins/constants';

export default class ContainerStep2 extends Component {

  confirmData = (data) => {
    const { navigation: { navigate, state: { params } } } = this.props;

    navigate(Constants.routeName.createParcelStep3, {
      ...data,
      ...params
    });
  };

  navigateBack = () => {
    const { navigation: { goBack } } = this.props;
    goBack();
  };

  render() {
    return (
      <Step2
        confirmData={this.confirmData}
        goBack={this.navigateBack}
      />
    );
  }
}

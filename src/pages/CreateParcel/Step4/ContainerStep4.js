import React, { Component } from 'react';
import Constants from '../../../mixins/constants';
import Step4 from './Step4';

export default class ContainerStep4 extends Component {

  readAnotherParcel = () => {
    const { navigation: { navigate } } = this.props;
    navigate(Constants.routeName.createParcelStep0);
  };

  render() {
    const { navigation: { openDrawer } } = this.props;
    return (
      <Step4 openDrawer={openDrawer} onButtonPress={this.readAnotherParcel} />
    );
  }
}

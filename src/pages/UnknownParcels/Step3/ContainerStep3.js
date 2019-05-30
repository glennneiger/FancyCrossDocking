import React, { Component } from 'react';
import Const from '../../../mixins/constants';
import Step3 from './Step3';

export default class ContainerStep3 extends Component {
  constructor(props) {
    super(props);

    this.navigateToStep1 = this.navigateToStep1.bind(this);
    this.state = {
    };
  }

  navigateToStep1 = () => {
    const {
      navigation: {
        navigate,
      },
    } = this.props;

    navigate(Const.routeName.unknownParcelStep0);
  };

  render() {
    const { navigation: { openDrawer } } = this.props;
    return (
      <Step3
        handleNavigateToFirstScreen={this.navigateToStep1}
        openDrawer={openDrawer}
      />
    );
  }
}

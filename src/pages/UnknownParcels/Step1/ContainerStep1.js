import React, { Component } from 'react';
import Step1 from './Step1';
import Const from '../../../mixins/constants';
import withOpenDrawer from '../../../hoc/withOpenDrawer';

class ContainerStep1 extends Component {
  constructor(props) {
    super(props);

    this.navigateToScanCamera = this.navigateToScanCamera.bind(this);
    this.state = {};
  }

  navigateToScanCamera = () => {
    const {
      navigation: {
        navigate,
        state: {
          params: {
            merchantId = null,
            merchantName = null,
          } = {},
        },
      },
    } = this.props;
    navigate(Const.routeName.scanCamera, {
      merchantId,
      merchantName,
    });
  };

  render() {
    const {
      message,
      subtitle,
    } = this.props;
    return (
      <Step1
        message={message}
        subtitle={subtitle}
        handleOpenDrawer={this.openDrawer}
        handleNavigateToNextScreen={this.navigateToScanCamera}
      />
    );
  }
}

ContainerStep1.defaultProps = {
  position: '1/3',
  message: Const.messageShotParcel,
  subtitle: Const.subMessageShotParcel,
};

export default withOpenDrawer(
  ContainerStep1,
);

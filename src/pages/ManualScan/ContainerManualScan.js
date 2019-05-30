import React, { Component } from 'react';

import ManualScan from './ManualScan';

/** assets */
import Colors from '../../assets/colors';
import Constants from '../../mixins/constants';
import { scanning } from '../../mixins/DigestData';
import { getOptions } from '../../mixins/Utils';
import withOpenDrawer from '../../hoc/withOpenDrawer';

class ContainerManualScan extends Component {
  constructor(props) {
    super(props);
    this.handleScan = this.handleScan.bind(this);
    this.state = {
      wmId: null,
      planningVersion: null,
      handlingListVersion: null,
      parcelCode: null,
      externalParcelCode: null,
      spinner: false,
      message: Constants.manualScanAvailable,
      messageColor: Colors.yellow,
    };
  }

  componentDidMount() {
    getOptions(
      e => this.props.navigation.navigate('Auth'),
      state => this.setState(state),
    );
  }

  handleScan = () => {
    const {
      wmId,
      planningVersion,
      handlingListVersion,
      parcelCode,
      externalParcelCode,
    } = this.state;
    const {
      sound,
    } = this.props.screenProps;

    const code = parcelCode
      ? { parcelCode }
      : { externalParcelCode };

    const data = {
      ...code,
      wmId,
      planningVersion,
      handlingListVersion,
    };
    scanning(
      data,
      sound,
      (success) => {
        if (success.messageColor !== Colors.pink) {
          return this.props.navigation.navigate(Constants.routeName.scanning, {
            successFromManual: success,
          });
        }
        this.setState({
          ...success,
          parcelCode: null,
          externalParcelCode: null,
        });
      },
    );
  };

  render() {
    const {
      section,
      openDrawer,
    } = this.props;
    const {
      message,
      messageColor,
      spinner,
      parcelCode,
      externalParcelCode,
    } = this.state;

    let errorText = null;
    let iconColor = Colors.darkGray1;

    if (messageColor === Colors.pink) {
      errorText = message;
      iconColor = messageColor;
    }

    return (
      <ManualScan
        section={section}
        message={message}
        messageColor={messageColor}
        spinner={spinner}
        parcelCode={parcelCode}
        externalParcelCode={externalParcelCode}
        errorText={errorText}
        iconColor={iconColor}
        openDrawer={openDrawer}
        setState={(label, r) => this.setState({ [label]: r })}
        handleScan={this.handleScan}
      />
    );
  }
}

export default withOpenDrawer(
  ContainerManualScan,
);

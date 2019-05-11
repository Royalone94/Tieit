// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DealContainer } from 'AppContainers';

export class DealScene extends PureComponent {

  static propTypes = {
    routeScene: PropTypes.func.isRequired,
    navigator: PropTypes.object.isRequired,
  };

  render() {
    const { routeScene, navigator } = this.props;

    return (
      <DealContainer
        routeScene={routeScene}
        navigator={navigator}
      />
    );
  }
}

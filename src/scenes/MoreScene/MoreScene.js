// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { MoreContainer } from 'AppContainers';

export class MoreScene extends PureComponent {

  static propTypes = {
    routeScene: PropTypes.func.isRequired
  };

  render() {
    const { routeScene } = this.props;

    return (
      <MoreContainer
        routeScene={routeScene}
      />
    );
  }
}

// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CompanyContainer } from 'AppContainers';

export class CompanyScene extends PureComponent {

  static propTypes = {
    routeScene: PropTypes.func.isRequired,
    navigator: PropTypes.object.isRequired,
  };

  render() {
    const { routeScene, navigator } = this.props;

    return (
      <CompanyContainer
        routeScene={routeScene}
        navigator={navigator}
      />
    );
  }
}

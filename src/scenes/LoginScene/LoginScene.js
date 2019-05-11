// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { LoginContainer } from 'AppContainers';

class LoginScene extends PureComponent {

  render() {
    const { routeScene } = this.props;

    return (
      <LoginContainer
        routeScene={routeScene}
      />
    );
  }
}

LoginScene.propTypes = {
  routeScene: PropTypes.func.isRequired
};

export default LoginScene;

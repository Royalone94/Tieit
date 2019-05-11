// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SideMenuContainer } from 'AppContainers';

class SideMenuScene extends PureComponent {

  render() {
    const { routeScene, navigator, switchTab } = this.props;

    return (
      <SideMenuContainer
        routeScene={routeScene}
        navigator={navigator}
        switchTab={switchTab}
      />
    );
  }
}

SideMenuScene.propTypes = {
  navigator: PropTypes.object.isRequired,
  routeScene: PropTypes.func.isRequired,
  switchTab: PropTypes.func.isRequired
};

export default SideMenuScene;

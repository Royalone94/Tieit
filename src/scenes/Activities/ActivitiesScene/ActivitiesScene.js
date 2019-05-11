// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ActivitiesContainer } from 'AppContainers';

class ActivitiesScene extends PureComponent {

  render() {
    const { routeScene, navigator } = this.props;

    return (
      <ActivitiesContainer
        routeScene={routeScene}
        navigator={navigator}
      />
    );
  }
}

ActivitiesScene.propTypes = {
  navigator: PropTypes.object.isRequired,
  routeScene: PropTypes.func.isRequired
};

export default ActivitiesScene;

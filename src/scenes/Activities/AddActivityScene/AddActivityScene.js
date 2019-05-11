// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AddActivityContainer } from 'AppContainers';

class AddActivityScene extends PureComponent {

  render() {
    const { routeScene, routeBack } = this.props;

    return (
      <AddActivityContainer
        routeScene={routeScene}
        routeBack={routeBack}
      />
    );
  }
}

AddActivityScene.propTypes = {
  routeScene: PropTypes.func.isRequired,
  routeBack: PropTypes.func.isRequired
};

export default AddActivityScene;

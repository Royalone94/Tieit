// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AddContactContainer } from 'AppContainers';

class AddContactScene extends PureComponent {

  render() {
    const { routeScene, routeBack } = this.props;

    return (
      <AddContactContainer
        routeScene={routeScene}
        routeBack={routeBack}
      />
    );
  }
}

AddContactScene.propTypes = {
  routeScene: PropTypes.func.isRequired,
  routeBack: PropTypes.func.isRequired
};

export default AddContactScene;

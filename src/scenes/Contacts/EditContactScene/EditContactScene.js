// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { EditContactContainer } from 'AppContainers';

class EditContactScene extends PureComponent {

  render() {
    const { routeScene, routeBack, selectedContact } = this.props;

    return (
      <EditContactContainer
        routeScene={routeScene}
        routeBack={routeBack}
        selectedContact={selectedContact}
      />
    );
  }
}

EditContactScene.propTypes = {
  routeScene: PropTypes.func.isRequired,
  routeBack: PropTypes.func.isRequired,
  selectedContact: PropTypes.object.isRequired
};

export default EditContactScene;

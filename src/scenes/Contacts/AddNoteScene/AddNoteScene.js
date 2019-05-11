// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AddNoteContainer } from 'AppContainers';

class AddNoteScene extends PureComponent {

  render() {
    const { routeScene, routeBack, contactData } = this.props;

    return (
      <AddNoteContainer
        routeScene={routeScene}
        routeBack={routeBack}
        contactData={contactData}
      />
    );
  }
}

AddNoteScene.propTypes = {
  routeScene: PropTypes.func.isRequired,
  routeBack: PropTypes.func.isRequired,
  contactData: PropTypes.object.isRequired
};

export default AddNoteScene;

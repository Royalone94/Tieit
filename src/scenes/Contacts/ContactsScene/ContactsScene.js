// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ContactsContainer } from 'AppContainers';

class ContactsScene extends PureComponent {

  render() {
    const { routeScene, navigator } = this.props;

    return (
      <ContactsContainer
        navigator={navigator}
        routeScene={routeScene}
      />
    );
  }
}

ContactsScene.propTypes = {
  routeScene: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
};

export default ContactsScene;

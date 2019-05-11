// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ContactDetailContainer } from 'AppContainers';

class ContactDetailScene extends PureComponent {

  render() {
    const { routeScene, routeBack, contactItem } = this.props;

    return (
      <ContactDetailContainer
        routeScene={routeScene}
        routeBack={routeBack}
        contactItem={contactItem}
      />
    );
  }
}

ContactDetailScene.propTypes = {
  routeScene: PropTypes.func.isRequired,
  routeBack: PropTypes.func.isRequired,
  contactItem: PropTypes.object.isRequired
};

export default ContactDetailScene;

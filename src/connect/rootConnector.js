// @flow

import React, { PureComponent } from 'react';

export default function rootConnector(Component: ReactClass<*>): ReactClass<*> {
  class RootConnector extends PureComponent {

    render() {
      return (
        <Component {...this.props} />
      );
    }
  }

  RootConnector.displayName = `RootConnector(${Component.name})`;

  return RootConnector;
}

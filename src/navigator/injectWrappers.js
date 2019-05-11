// @flow

import React from 'react';

import { Provider } from 'AppRedux';
import { overrideLogs } from 'AppUtilities';
import { rootConnector, BannerWrapper } from 'AppConnectors';

import mapNavigatorToProps from './mapNavigationToProps';

if (!__DEV__) {
  overrideLogs();
}

export default function (Component: React.Element<*>): Function {
  return function navigationConnector(): Function {
    return function inject(props: Object): React.Element<*> {
      const AppLevelEnhanced = rootConnector(Component);

      return (
        <Provider>
          <BannerWrapper>
            <AppLevelEnhanced
              {...props}
              {...mapNavigatorToProps(props.navigator)}
            />
          </BannerWrapper>
        </Provider>
      );
    };
  };
}

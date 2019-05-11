// @flow

import React from 'react';
import { Navigation } from 'react-native-navigation';
import injectWrappers from './injectWrappers';
import * as AppScenes from 'AppScenes';
import { Logger } from 'AppUtilities';
import * as ScreenNames from './constants';

const Scenes = { ...AppScenes };

const logger = new Logger('registerScreens');

export default function initializeScreens(): void {
  logger.info('Initialize screens');
  const hasOwn = Object.prototype.hasOwnProperty;

  for (const key in ScreenNames) {
    if (!hasOwn.call(ScreenNames, key)) {
      continue;
    }
    const name: string = ScreenNames[key];
    const screen: string = name.replace(/app\./, '');
    const Scene: React.Element<*> = Scenes[screen];

    if ((!name || !screen || !Scene) && __DEV__) {
      console.error({
        name,
        screenName: screen,
        screen: Scene
      });
    }
    logger.info(`Registered - ${screen}`);
    Navigation.registerComponent(name, injectWrappers(Scene));
  }
  logger.info('All screens initialized successfully !');
}

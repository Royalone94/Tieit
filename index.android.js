// @flow

import { startLoginScene, startApp } from 'AppNavigator';
import { CachedImage } from 'AppUtilities';
import { AsyncStorage } from 'react-native';
import { setStatusBarHidden } from 'AppUtilities';

if (__DEV__) {
  require('react-devtools');
}

setStatusBarHidden(true);

CachedImage.init()
  .then(() => AsyncStorage.getItem('@TIEIT:TOKEN'))
  .then((val) => {
    if (val) {
      startApp();
    } else {
      startLoginScene();
    }
  })
  .catch(() => {});

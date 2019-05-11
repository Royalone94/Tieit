//  @flow

import type { Navigator } from 'AppTypes';
import { Platform } from 'react-native';
import { escapeScreenName } from 'AppUtilities';
import { debounce } from 'lodash';
import { startTutorialScene } from './Navigator';
import { WHITE } from 'AppColors';

import {
  LOGIN_SCENE
} from './constants';

type NavigationEvent<T> = {
  id: T,
  unselectedTabIndex?: number
}

type SetNavigationEvent<T> = (cb: (e: NavigationEvent<T>) => any) => any;

type MapParams = {
  setBadge: (key: string, value: number) => void,
  onBack: (animated: ?boolean) => void,
  routeBack: (...data: any) => void,
  replaceCurrentScene: (scene: string, passProps: ?Object) => void,
  replaceCurrentSceneProps: (passProps: ?Object, index: number) => void,
  routeScene: (sceneName: string, passProps?: Object, params?: Object) => void,
  resetRouteStack: (index: number, passProps?: Object) => void,
  resetToRouteStack: () => void,
  resetTo: (sceneName: string, passProps?: Object, params?: Object) => void,
  jumpTo: (tabIndex: number) => void,
  popAndJump: (scene: string) => void,
  popToRoot: (params?: Object) => void,
  showModal: (sceneName: string, passProps?: Object, params?: Object) => void,
  dismissModal: (params?: Object) => void,
  screenWillAppear: SetNavigationEvent<'willAppear'>,
  screenDidAppear: SetNavigationEvent<'didAppear'>,
  screenWillDisappear: SetNavigationEvent<'willDisappear'>,
  screenDidDisappear: SetNavigationEvent<'didDisappear'>,
};

const BACK_ICON = require('img/icons/nav_bar/icon_back.png');

const ACTION_DELAY = 200;
const IGNORE_DEBOUNCE_LIST = [
  'setBadge',
  'popToRoot',
  'resetTo',
  'screenWillAppear',
  'screenDidAppear',
  'screenWillDisappear',
  'screenDidDisappear'
];


function getSceneNavigatorStyle(scene: string) {
  const navigatorParams = {};
  switch (scene) {
    case escapeScreenName(LOGIN_SCENE):
      if (Platform.OS === 'ios') {
        navigatorParams.statusBarTextColorScheme = 'light';
      } else {
        navigatorParams.statusBarTextColorScheme = 'dark';
        navigatorParams.statusBarColor = WHITE;
      }
      break;
    default:
      navigatorParams.statusBarTextColorScheme = 'light';
      break;
  }
  return navigatorParams;
}

function debounceMethods(passActions: MapParams, ignoreList: string[], DELAY: number): MapParams {
  const actions = { ...passActions };
  Object.keys(actions)
    .forEach((fnName) => {
      if (ignoreList.includes(fnName)) {
        return;
      }
      actions[fnName] = debounce(actions[fnName], DELAY);
    });

  return actions;
}

export default function (navigation: Navigator): MapParams {
  const passActions = {
    onBack: (animated?: boolean) => {
      navigation.pop({
        animated: !!animated
      });
    },
    routeBack: () => {
      navigation.pop();
    },
    replaceCurrentSceneProps: () => {},
    resetRouteStack: (tabIndex: number, passProps: ?Object) => {
      if (passProps && passProps.logout) {
        startTutorialScene();
        return;
      }
      navigation.popToRoot();
      navigation.switchToTab({ tabIndex });
    },
    resetToRouteStack: () => {},
    switchTab: (tabIndex: number) => {
      navigation.switchToTab({ tabIndex });
    },
    jumpTo: (tabIndex: number) => {
      navigation.popToRoot({ animated: false });
      navigation.switchToTab({ tabIndex });
    },
    showLightBox: (screenName: string, passProps: Object, style?: Object): void => {
      navigation.showLightBox({
        screen: `app.${screenName}`,
        passProps,
        style
      });
    },
    dismissLightBox: (params: Object): void => {
      navigation.dismissLightBox(params);
    },
    routeScene: (scene: string, passProps: ?Object, params: Object = {}) => {
      navigation.push({
        screen: `app.${scene}`,
        navigatorStyle: {
          navBarHidden: true,
          screenBackgroundColor: 'white',
          navBarTitleTextCentered: true, // Android only
          disabledBackGesture: false,
          orientation: 'portrait',
          enabledBackGestureFullScreen: true,
          ...getSceneNavigatorStyle(scene),
          ...params.navigatorStyle
        },
        navigatorButtons: {
          ...Platform.select({
            android: {
              leftButtons: [{
                icon: BACK_ICON,
                id: 'back'
              }],
              animated: true,
            }
          }),
          ...params.navigatorButtons,
        },
        backButtonHidden: params.backButtonHidden,
        backButtonTitle: params.backButtonTitle,
        title: params.title,
        titleImage: params.titleImage,
        animated: params.animated,
        overrideBackPress: params.overrideBackPress,
        passProps
      });
    },
    setBadge: (key: string, value: number) => {
      const mapNamesToKeys = {
        notifications: 'badge',
        messages: 'secondaryBadge'
      };
      navigation.setTabBadge({
        tabIndex: 2,
        [mapNamesToKeys[key]]: value
      });
    },
    popToRoot: (params: ?Object) => {
      navigation.popToRoot(params);
    },
    resetTo: (scene: string, passProps: ?Object, params: Object = {}) => {
      navigation.resetTo({
        screen: `app.${scene}`,
        title: params.title,
        animated: params.animated,
        navigatorStyle: {
          navBarHidden: true,
          ...params.navigatorStyle,
        },
        navigatorButtons: {
          ...Platform.select({
            android: {
              leftButtons: [{
                icon: BACK_ICON,
                id: 'back'
              }],
              animated: true,
            }
          }),
          ...params.navigatorButtons,
        },
        overrideBackPress: params.overrideBackPress,
        passProps: {
          ...passProps,
        }
      });
    },
    showModal: (scene: string, passProps: ?Object, params: Object = {}) => {
      navigation.showModal({
        screen: `app.${scene}`,
        title: params.title,
        navigatorStyle: {
          navBarHidden: true,
          orientation: 'portrait',
          ...params.navigatorStyle,
        },
        animationType: params.animationType,
        overrideBackPress: params.overrideBackPress,
        passProps,
      });
    },
    dismissModal: (params: Object = {}) => {
      navigation.dismissModal({
        animationType: params.animationType,
      });
    },
  };

  return debounceMethods(passActions, IGNORE_DEBOUNCE_LIST, ACTION_DELAY);
}

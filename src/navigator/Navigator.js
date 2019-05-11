// @flow

import { Navigation } from 'react-native-navigation';
import { NativeModules } from 'react-native';
import {
  CONTACT_SCENE,
  COMPANY_SCENE,
  DEAL_SCENE,
  ACTIVITIES_SCENE,
  MORE_SCENE,
  LOGIN_SCENE,
  SIDE_MENU_SCENE,
  ADD_ACTIVITY_SCENE
} from './constants';

import { WHITE, PRIMARY_COLOR, LIGHT_GRAY } from 'AppColors';

import registerScreens from './registerScreens';

const SIDE_MENU_ICON = require('img/icons/nav_bar/icon_side_menu.png');

const { UIManager } = NativeModules;

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

registerScreens();

type Tab = {
  screen: string,
  icon?: number,
  selectedIcon?: number,
  navigatorStyle?: {
    navBarHidden?: boolean
  }
};

const navBarStyle = {
  navigatorStyle: {
    navBarHidden: true,
    tabBarHidden: false,
    statusBarHidden: false,
    statusBarTextColorScheme: 'light',
    screenBackgroundColor: WHITE
  },
  navigatorButtons: {
    leftButtons: [{
      icon: SIDE_MENU_ICON,
      id: 'sideMenu'
    }]
  },
  iconInsets: {
    top: 2,
    bottom: -2,
    left: 0,
    right: 0
  }
};

const TABS: Array<Tab> = [
  {
    screen: CONTACT_SCENE,
    // screen: ADD_ACTIVITY_SCENE,
    label: 'Contacts',
    icon: require('img/icons/tab_bar/icon_contacts.png'),
    selectedIcon: require('img/icons/tab_bar/icon_contacts_selected.png'),
    ...navBarStyle
  },
  {
    screen: COMPANY_SCENE,
    label: 'Companies',
    icon: require('img/icons/tab_bar/icon_companies.png'),
    selectedIcon: require('img/icons/tab_bar/icon_companies_selected.png'),
    ...navBarStyle
  },
  {
    screen: DEAL_SCENE,
    label: 'Deals',
    icon: require('img/icons/tab_bar/icon_deals.png'),
    selectedIcon: require('img/icons/tab_bar/icon_deals_selected.png'),
    ...navBarStyle
  },
  {
    screen: ACTIVITIES_SCENE,
    label: 'Activities',
    icon: require('img/icons/tab_bar/icon_activities.png'),
    selectedIcon: require('img/icons/tab_bar/icon_activities_selected.png'),
    ...navBarStyle
  },
  // @TODO:David Restore more tab later
  // {
  //   screen: MORE_SCENE,
  //   label: 'More',
  //   icon: require('img/icons/tab_bar/icon_more.png'),
  //   selectedIcon: require('img/icons/tab_bar/icon_more_selected.png'),
  //   ...navBarStyle
  // }
];

export function startApp(initialTabIndex = 0) {
  Navigation.startTabBasedApp({
    tabs: TABS,
    tabsStyle: {
      tabBarButtonColor: LIGHT_GRAY,
      tabBarSelectedButtonColor: WHITE,
      tabBarBackgroundColor: PRIMARY_COLOR,
      tabBarLabelColor: LIGHT_GRAY,
      tabBarSelectedLabelColor: WHITE,
      tabBarHideShadow: false,
      initialTabIndex
    },
    animationType: 'fade',
    drawer: {
      left: {
        screen: SIDE_MENU_SCENE,
        passProps: {}
      },
      style: {
        drawerShadow: true,
        contentOverlayColor: 'rgba(0,0,0,0.1)',
        leftDrawerWidth: 70
      },
      animationType: 'door',
      disableOpenGesture: true
    }
  });
}

export function startLoginScene() {
  Navigation.startSingleScreenApp({
    screen: {
      screen: LOGIN_SCENE,
      navigatorStyle: {
        navBarHidden: true,
        navBarButtonColor: WHITE,
        statusBarHidden: false
      }
    },
    appStyle: {
      orientation: 'portrait'
    },
    animationType: 'fade',
  });
}

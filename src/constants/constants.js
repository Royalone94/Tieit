import { Dimensions, StatusBar, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const isIOS = Platform.OS === 'ios';

export const WINDOW_WIDTH = width;
export const WINDOW_HEIGHT = height;
export const STATUSBAR_HEIGHT = isIOS ? 20 : StatusBar.currentHeight;
export const NAVBAR_HEIGHT = WINDOW_HEIGHT * 0.066;

export const TAB_MAP = ['SearchScene', 'SettingsScene', 'TutorialScene'];

export const SYSTEM_MESSAGES = {
  FROM_REQUEST: {
    title: 'Something went wrong',
    description: 'We are currently experiencing technical difficulties, please try again later.',
  },
  NOT_SUPPORTED_LINK: {
    title: 'Not Supported',
    description: 'Current link is not supported'
  }
};

export const KEYBOARD_EVENTS = {
  DID_SHOW: 'keyboardDidShow',
  WILL_SHOW: 'keyboardWillShow',
  WILL_HIDE: 'keyboardWillHide',
  DID_HIDE: 'keyboardDidHide',
  WILL_CHANGE_FRAME: 'keyboardWillChangeFrame',
  DID_CHANGE_FRAME: 'keyboardDidChangeFrame'
};

export const GOOGLE_MAP_KEY = 'AIzaSyDUbbatHecJGPifCCILk4BsvzToG-DV3xE';

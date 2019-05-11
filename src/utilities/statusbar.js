import { StatusBar, Platform } from 'react-native';

export function setStatusBarHidden(hidden = true) {
  if (Platform.OS === 'ios') {
    return;
  }
  StatusBar.setHidden(hidden);
}

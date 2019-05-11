import { Alert } from 'react-native';
import _ from 'lodash';
import { SYSTEM_MESSAGES } from 'AppConstants';
import { isTimeoutError } from './is-timeout-error';

const { FROM_REQUEST, TRIM_DURATION_MAX } = SYSTEM_MESSAGES;

const showMessage = (
  title = FROM_REQUEST.title,
  content = FROM_REQUEST.description
) => {
  Alert.alert(title, content);
};

const notSupportedLink = () => {
  const { NOT_SUPPORTED_LINK } = SYSTEM_MESSAGES;
  Alert.alert(NOT_SUPPORTED_LINK.title, NOT_SUPPORTED_LINK.description);
};

const trimDurationMax = (duration) => {
  Alert.alert(TRIM_DURATION_MAX.title, TRIM_DURATION_MAX.description(duration));
};

const fromRequest = (
  error,
  title = FROM_REQUEST.title,
  content = FROM_REQUEST.description
) => {
  console.log(error); // DON'T REMOVE THIS
  if (error.name === 'ConnectionError' ||
     error.name === 'NotAuthenticated' ||
      isTimeoutError(error)) {
    return null;
  }
  if (error && error.isCanceled) {
    return null;
  }
  if (error && typeof error !== 'object') {
    return showMessage(error, content);
  }
  if (!error || !Object.keys(error).length) {
    return showMessage(title, content);
  }
  return Alert.alert(_.startCase(error.name) || title, _.startCase(error.message) || content);
};

export const AlertMessage = {
  showMessage, fromRequest,
  notSupportedLink, trimDurationMax,
};

/**
 * @providesModule AppUtilities
 */

export { Logger } from './Logger';
export escapeScreenName from './escapeScreenName';
export { setStatusBarHidden } from './statusbar';
export { overrideLogs } from './global-injector';
export { default as shallowCompare } from './shallowCompare';
export { AlertMessage } from './alert-message';
export { Storage, CachedImage } from './storage';
export { dismissKeyboard } from './dismiss-keyboard';
export { formatNumber } from './format-number';
export { formatDate, formatStringToISODate } from './format-date';
export { promisify } from './promisify';
export { generateShortName, generateFullName } from './generate-shortname';

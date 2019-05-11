// @flow

import { createAction } from 'redux-actions';
import { createPromiseAction } from '../utils';

/**
 * Action Types
 */

export const LOGIN_USER = 'user/USER_LOGIN';
export const GET_OAUTH_TOKEN = 'user/GET_OAUTH_TOKEN';
export const GET_USER_INFO = 'user/GET_USER_INFO';
export const GET_USER_INFO_SUCCESS = 'user/GET_USER_INFO_SUCCESS';

/**
 * Action Creators
 */
export const userActionCreators = {
  login: createPromiseAction(LOGIN_USER),
  getOAuthToken: createPromiseAction(GET_OAUTH_TOKEN),
  getUserInfo: createPromiseAction(GET_USER_INFO),
  getUserInfoSuccess: createAction(GET_USER_INFO_SUCCESS),
};

// @flow

import { AsyncStorage } from 'react-native';

import {
  API_ENDPOINT,
  API_LOGIN
} from './constants';

import { set, isEmpty } from 'lodash';

export async function TieiT_Service({ api, method, params }) {
  const headers = {};

  if (api !== API_LOGIN) {
    const token = await AsyncStorage.getItem('@TIEIT:TOKEN');
    const token_type = await AsyncStorage.getItem('@TIEIT:TOKEN_TYPE');
    set(headers, 'Authorization', `${token_type} ${token}`);
  }
  set(headers, 'Accept', 'application/json');
  set(headers, 'Content-Type', 'application/json');

  const reqBody = {
    method,
    headers
  };

  if (!isEmpty(params)) {
    reqBody.body = JSON.stringify(params);
  }

  console.log('end point = ', `${API_ENDPOINT}${api}`);
  console.log('req body = ', reqBody);
  return fetch(`${API_ENDPOINT}${api}`, reqBody);
}

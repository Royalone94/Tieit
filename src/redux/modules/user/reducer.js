// @flow

import type { Action } from 'AppTypes';

import {
  GET_USER_INFO_SUCCESS
} from './actions';

export const DEFAULT = {};

export default function user(state = DEFAULT, action: Action = {}) {
  const { type, payload } = action;

  switch (type) {
    case GET_USER_INFO_SUCCESS: {
      return payload;
    }
    default:
      return state;
  }
}

// @flow

import type { Action } from 'AppTypes';

import {
  GET_GROUPS_SUCCESS
} from './actions';

export const DEFAULT = [];

export default function groups(state = DEFAULT, action: Action = {}) {
  const { type, payload } = action;

  switch (type) {
    case GET_GROUPS_SUCCESS: {
      return payload;
    }
    default:
      return state;
  }
}

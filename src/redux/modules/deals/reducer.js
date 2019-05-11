// @flow

import type { Action } from 'AppTypes';

import {
  GET_DEALS_SUCCESS
} from './actions';

export const DEFAULT = [];

export default function deals(state = DEFAULT, action: Action = {}) {
  const { type, payload } = action;

  switch (type) {
    case GET_DEALS_SUCCESS: {
      return payload;
    }
    default:
      return state;
  }
}

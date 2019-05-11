// @flow

import type { Action } from 'AppTypes';

import {
  GET_COMPANIES_SUCCESS
} from './actions';

export const DEFAULT = [];

export default function companies(state = DEFAULT, action: Action = {}) {
  const { type, payload } = action;

  switch (type) {
    case GET_COMPANIES_SUCCESS: {
      return payload;
    }
    default:
      return state;
  }
}

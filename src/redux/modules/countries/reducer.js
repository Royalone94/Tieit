// @flow

import type { Action } from 'AppTypes';

import {
  GET_COUNTRIES_SUCCESS
} from './actions';

export const DEFAULT = [];

export default function countries(state = DEFAULT, action: Action = {}) {
  const { type, payload } = action;

  switch (type) {
    case GET_COUNTRIES_SUCCESS: {
      return payload;
    }
    default:
      return state;
  }
}

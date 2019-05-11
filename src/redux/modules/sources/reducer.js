// @flow

import type { Action } from 'AppTypes';

import {
  GET_SOURCES_SUCCESS
} from './actions';

export const DEFAULT = [];

export default function sources(state = DEFAULT, action: Action = {}) {
  const { type, payload } = action;

  switch (type) {
    case GET_SOURCES_SUCCESS: {
      return payload;
    }
    default:
      return state;
  }
}

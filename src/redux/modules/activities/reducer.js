// @flow

import type { Action } from 'AppTypes';

import {
  GET_ACTIVITIES_SUCCESS
} from './actions';

export const DEFAULT = [];

export default function activities(state = DEFAULT, action: Action = {}) {
  const { type, payload } = action;

  switch (type) {
    case GET_ACTIVITIES_SUCCESS: {
      return payload;
    }
    default:
      return state;
  }
}

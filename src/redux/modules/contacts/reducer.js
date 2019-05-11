// @flow

import type { Action } from 'AppTypes';

import {
  GET_CONTACT_DETAIL_SUCCESS,
  GET_CONTACT_LIST_SUCCESS,
  GET_CONTACT_NOTES_SUCCESS
} from './actions';

export const DEFAULT = {
  list: [],
  details: {}
};

export default function contacts(state = DEFAULT, action: Action = {}) {
  const { type, payload } = action;

  switch (type) {
    case GET_CONTACT_LIST_SUCCESS: {
      return {
        ...state,
        list: payload
      };
    }
    case GET_CONTACT_DETAIL_SUCCESS: {
      return {
        ...state,
        details: {
          ...state.details,
          [payload.contact_id]: payload
        }
      };
    }
    case GET_CONTACT_NOTES_SUCCESS: {
      const { details } = state;

      return {
        ...state,
        details: {
          ...state.details,
          [payload.contact_id]: {
            ...details[payload.contact_id],
            notes: payload.notes
          }
        }
      };
    }
    default:
      return state;
  }
}

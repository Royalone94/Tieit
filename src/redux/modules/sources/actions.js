// @flow

import { createAction } from 'redux-actions';
import { createPromiseAction } from '../utils';

/**
 * Action Types
 */

export const GET_SOURCES = 'source/GET_SOURCES';
export const GET_SOURCES_SUCCESS = 'contacts/GET_SOURCES_SUCCESS';

/**
 * Action Creators
 */
export const sourcesActionCreators = {
  getSources: createPromiseAction(GET_SOURCES),
  getSourcesSuccess: createAction(GET_SOURCES_SUCCESS)
};

// @flow

import { createAction } from 'redux-actions';
import { createPromiseAction } from '../utils';

/**
 * Action Types
 */

export const GET_DEALS = 'source/GET_DEALS';
export const GET_DEALS_SUCCESS = 'contacts/GET_DEALS_SUCCESS';

/**
 * Action Creators
 */
export const dealsActionCreators = {
  getDeals: createPromiseAction(GET_DEALS),
  getDealsSuccess: createAction(GET_DEALS_SUCCESS)
};

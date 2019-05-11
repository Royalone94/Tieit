// @flow

import { createAction } from 'redux-actions';
import { createPromiseAction } from '../utils';

/**
 * Action Types
 */

export const GET_COUNTRIES = 'source/GET_COUNTRIES';
export const GET_COUNTRIES_SUCCESS = 'contacts/GET_COUNTRIES_SUCCESS';

/**
 * Action Creators
 */
export const countriesActionCreators = {
  getCountries: createPromiseAction(GET_COUNTRIES),
  getCountriesSuccess: createAction(GET_COUNTRIES_SUCCESS)
};

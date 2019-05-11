// @flow

import { createAction } from 'redux-actions';
import { createPromiseAction } from '../utils';

/**
 * Action Types
 */

export const GET_COMPANIES = 'companies/GET_COMPANIES';
export const GET_COMPANIES_SUCCESS = 'companies/GET_COMPANIES_SUCCESS';

/**
 * Action Creators
 */
export const companiesActionCreators = {
  getCompanies: createPromiseAction(GET_COMPANIES),
  getCompaniesSuccess: createAction(GET_COMPANIES_SUCCESS)
};

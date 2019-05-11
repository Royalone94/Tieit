// @flow

import { createAction } from 'redux-actions';
import { createPromiseAction } from '../utils';

/**
 * Action Types
 */

export const GET_ACTIVITIES = 'companies/GET_ACTIVITIES';
export const GET_ACTIVITIES_SUCCESS = 'companies/GET_ACTIVITIES_SUCCESS';

/**
 * Action Creators
 */
export const activitiesActionCreators = {
  getActivities: createPromiseAction(GET_ACTIVITIES),
  getActivitiesSuccess: createAction(GET_ACTIVITIES_SUCCESS)
};

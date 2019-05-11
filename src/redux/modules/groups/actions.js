// @flow

import { createAction } from 'redux-actions';
import { createPromiseAction } from '../utils';

/**
 * Action Types
 */

export const GET_GROUPS = 'group/GET_GROUPS';
export const GET_GROUPS_SUCCESS = 'group/GET_GROUPS_SUCCESS';

/**
 * Action Creators
 */
export const groupsActionCreators = {
  getGroups: createPromiseAction(GET_GROUPS),
  getGroupsSuccess: createAction(GET_GROUPS_SUCCESS)
};

// @flow

import {
  user,
  contacts,
  sources,
  groups,
  companies,
  deals,
  countries,
  activities,
} from '../modules';

import { combineReducers } from 'redux';
export default combineReducers({
  user,
  contacts,
  sources,
  groups,
  companies,
  deals,
  countries,
  activities,
});

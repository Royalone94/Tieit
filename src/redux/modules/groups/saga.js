// @flow

import {
  take,
  put,
  call,
  fork,
  all
} from 'redux-saga/effects';

import {
  GET_GROUPS,
  groupsActionCreators
} from './actions';

import {
  TieiT_Service,
  API_GET_GROUPS
} from 'AppServices';

export function* asyncGetGroups({ resolve, reject }) {
  try {
    const response = yield call(TieiT_Service,
      { api: API_GET_GROUPS, method: 'GET', params: null });

    if (response.status === 200) {
      const res = JSON.parse(response._bodyText);
      yield put(groupsActionCreators.getGroupsSuccess(res.contacts_groups));
      resolve();
    } else {
      reject();
    }
  } catch (e) {
    console.log(e);
    reject();
  }
}

export function *watchGetGroups() {
  while (true) {
    const action: Action = yield take(GET_GROUPS);
    yield* asyncGetGroups(action);
  }
}

export default function* (): Iterable {
  yield all([
    fork(watchGetGroups)
  ]);
}

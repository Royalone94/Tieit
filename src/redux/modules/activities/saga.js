// @flow

import {
  take,
  put,
  call,
  fork,
  all
} from 'redux-saga/effects';

import {
  GET_ACTIVITIES,
  activitiesActionCreators
} from './actions';

import {
  TieiT_Service,
  API_GET_ACTIVITIES
} from 'AppServices';

export function* asyncGetActivities({ resolve, reject }) {
  try {
    const response = yield call(TieiT_Service,
      { api: API_GET_ACTIVITIES, method: 'GET', params: null });

    if (response.status === 200) {
      const res = JSON.parse(response._bodyText);
      yield put(activitiesActionCreators.getActivitiesSuccess(res.activities));
      resolve();
    } else {
      reject();
    }
  } catch (e) {
    console.log(e);
    reject();
  }
}

export function *watchGetActivities() {
  while (true) {
    const action: Action = yield take(GET_ACTIVITIES);
    yield* asyncGetActivities(action);
  }
}

export default function* (): Iterable {
  yield all([
    fork(watchGetActivities)
  ]);
}

// @flow

import {
  take,
  put,
  call,
  fork,
  all
} from 'redux-saga/effects';

import {
  GET_SOURCES,
  sourcesActionCreators
} from './actions';

import {
  TieiT_Service,
  API_GET_SOURCES
} from 'AppServices';

export function* asyncGetSources({ resolve, reject }) {
  try {
    const response = yield call(TieiT_Service,
      { api: API_GET_SOURCES, method: 'GET', params: null });

    if (response.status === 200) {
      const res = JSON.parse(response._bodyText);
      yield put(sourcesActionCreators.getSourcesSuccess(res));
      resolve();
    } else {
      reject();
    }
  } catch (e) {
    console.log(e);
    reject();
  }
}

export function *watchGetSources() {
  while (true) {
    const action: Action = yield take(GET_SOURCES);
    yield* asyncGetSources(action);
  }
}

export default function* (): Iterable {
  yield all([
    fork(watchGetSources)
  ]);
}

// @flow

import {
  take,
  put,
  call,
  fork,
  all
} from 'redux-saga/effects';

import {
  GET_DEALS,
  dealsActionCreators
} from './actions';

import {
  TieiT_Service,
  API_GET_DEALS
} from 'AppServices';

export function* asyncGetDeals({ resolve, reject }) {
  try {
    const response = yield call(TieiT_Service,
      { api: API_GET_DEALS, method: 'GET', params: null });

    if (response.status === 200) {
      const res = JSON.parse(response._bodyText);
      yield put(dealsActionCreators.getDealsSuccess(res.crm_deals));
      resolve();
    } else {
      reject();
    }
  } catch (e) {
    console.log(e);
    reject();
  }
}

export function *watchGetDeals() {
  while (true) {
    const action: Action = yield take(GET_DEALS);
    yield* asyncGetDeals(action);
  }
}

export default function* (): Iterable {
  yield all([
    fork(watchGetDeals)
  ]);
}

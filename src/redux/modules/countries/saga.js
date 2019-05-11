// @flow

import {
  take,
  put,
  call,
  fork,
  all
} from 'redux-saga/effects';

import {
  GET_COUNTRIES,
  countriesActionCreators
} from './actions';

import {
  TieiT_Service,
  API_GET_COUNTRIES
} from 'AppServices';

export function* asyncGetCountries({ resolve, reject }) {
  try {
    const response = yield call(TieiT_Service,
      { api: API_GET_COUNTRIES, method: 'GET', params: null });

    if (response.status === 200) {
      const res = JSON.parse(response._bodyText);
      yield put(countriesActionCreators.getCountriesSuccess(res.countries));
      resolve();
    } else {
      reject();
    }
  } catch (e) {
    console.log(e);
    reject();
  }
}

export function *watchGetCountries() {
  while (true) {
    const action: Action = yield take(GET_COUNTRIES);
    yield* asyncGetCountries(action);
  }
}

export default function* (): Iterable {
  yield all([
    fork(watchGetCountries)
  ]);
}

// @flow

import {
  take,
  put,
  call,
  fork,
  all
} from 'redux-saga/effects';

import {
  GET_COMPANIES,
  companiesActionCreators
} from './actions';

import {
  TieiT_Service,
  API_GET_COMPANIES
} from 'AppServices';

export function* asyncGetCompanies({ resolve, reject }) {
  try {
    const response = yield call(TieiT_Service,
      { api: API_GET_COMPANIES, method: 'GET', params: null });

    if (response.status === 200) {
      const res = JSON.parse(response._bodyText);
      yield put(companiesActionCreators.getCompaniesSuccess(res.companies));
      resolve();
    } else {
      reject();
    }
  } catch (e) {
    console.log(e);
    reject();
  }
}

export function *watchGetCompanies() {
  while (true) {
    const action: Action = yield take(GET_COMPANIES);
    yield* asyncGetCompanies(action);
  }
}

export default function* (): Iterable {
  yield all([
    fork(watchGetCompanies)
  ]);
}

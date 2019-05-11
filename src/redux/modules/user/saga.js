// @flow

import {
  take,
  put,
  call,
  fork,
  all
} from 'redux-saga/effects';

import {
  LOGIN_USER,
  GET_OAUTH_TOKEN,
  GET_USER_INFO,
  userActionCreators
} from './actions';

import {
  TieiT_Service,
  API_GET_USER_INFO,
  API_GET_OAUTH_TOKEN,
  API_LOGIN
} from 'AppServices';

export function* asyncLoginUser({ payload, resolve, reject }) {
  const { email, password } = payload;
  try {
    const response = yield call(TieiT_Service,
      { api: API_LOGIN, method: 'POST', params: { email, password } });

    if (response.status === 200) {
      const res = JSON.parse(response._bodyText);
      resolve(res.token);
    } else {
      const res = JSON.parse(response._bodyText);
      reject(res.message);
    }
  } catch (e) {
    reject(e.toString());
  }
}

export function* asyncGetOAuthToken({ payload, resolve, reject }) {
  try {
    const response = yield call(TieiT_Service,
      { api: API_GET_OAUTH_TOKEN, method: 'POST', params: { ...payload } });

    if (response.status === 200) {
      const res = JSON.parse(response._bodyText);
      resolve(res);
    } else {
      const res = JSON.parse(response._bodyText);
      reject(res.message);
    }
  } catch (e) {
    reject(e.toString());
  }
}

export function* asyncGetUserInfo({ resolve, reject }) {
  try {
    const response = yield call(TieiT_Service,
      { api: API_GET_USER_INFO, method: 'GET', params: null });

    if (response.status === 200) {
      const res = JSON.parse(response._bodyText);
      yield put(userActionCreators.getUserInfoSuccess(res));
      resolve();
    } else {
      const res = JSON.parse(response._bodyText);
      reject(res.message);
    }
  } catch (e) {
    reject(e.toString());
  }
}

export function *watchLoginUser() {
  while (true) {
    const action: Action = yield take(LOGIN_USER);
    yield* asyncLoginUser(action);
  }
}

export function *watchGetOAuthToken() {
  while (true) {
    const action: Action = yield take(GET_OAUTH_TOKEN);
    yield* asyncGetOAuthToken(action);
  }
}

export function *watchGetUserInfo() {
  while (true) {
    const action: Action = yield take(GET_USER_INFO);
    yield* asyncGetUserInfo(action);
  }
}

export default function* (): Iterable {
  yield all([
    fork(watchLoginUser),
    fork(watchGetOAuthToken),
    fork(watchGetUserInfo)
  ]);
}

// @flow

import {
  take,
  put,
  call,
  fork,
  all
} from 'redux-saga/effects';

import {
  GET_CONTACT_DETAIL,
  GET_CONTACT_LIST,
  CREATE_NEW_CONTACT,
  GET_CONTACT_NOTES,
  CREATE_NEW_CONTACT_NOTES,
  ADD_CONTACT_TO_GROUP,
  UPDATE_CONTACT,
  contactsActionCreators
} from './actions';

import {
  TieiT_Service
} from 'AppServices';
import { startLoginScene } from 'AppNavigator';
import { AsyncStorage } from 'react-native';

export function* asyncGetContactList({ resolve, reject }) {
  try {
    const response = yield call(TieiT_Service,
      { api: 'contacts', method: 'GET', params: null });

    if (response.status === 200) {
      const res = JSON.parse(response._bodyText);
      yield put(contactsActionCreators.getContactListSuccess(res.data));
      resolve();
    } else if (response.status === 401) {
      AsyncStorage.removeItem('@TIEIT:TOKEN');
      startLoginScene();
    } else {
      reject();
    }
  } catch (e) {
    reject(e);
  }
}

export function* asyncGetContactDetail({ payload, resolve, reject }) {
  const { contact_id } = payload;

  try {
    const detailResponse = yield call(TieiT_Service,
      { api: `contacts/${contact_id}`, method: 'GET', params: null });

    if (detailResponse.status === 200) {
      const detailRes = JSON.parse(detailResponse._bodyText);
      yield put(contactsActionCreators.getContactDetailSuccess(detailRes.data));
      resolve();
    } else if (detailResponse.status === 401) {
      AsyncStorage.removeItem('@TIEIT:TOKEN');
      startLoginScene();
    } else {
      console.log(detailResponse);
      reject();
    }
  } catch (e) {
    console.log(e);
    reject();
  }
}

export function* asyncCreateNewContact({ payload, resolve, reject }) {
  try {
    const response = yield call(TieiT_Service,
      { api: 'contacts', method: 'POST', params: { ...payload } });
    console.log('response = ', response);
    if (response.status === 200) {
      const res = JSON.parse(response._bodyText);
      resolve(res.message);
    } else if (response.status === 401) {
      startLoginScene();
    } else {
      const res = JSON.parse(response._bodyText);
      reject(res.message);
    }
  } catch (e) {
    reject(e);
  }
}

export function* asyncGetContactNotes({ payload, resolve, reject }) {
  const { contact_id } = payload;

  try {
    const notesResponse = yield call(TieiT_Service,
      { api: `contacts/${contact_id}/notes`, method: 'GET', params: null });

    if (notesResponse.status === 200) {
      const notesRes = JSON.parse(notesResponse._bodyText);
      yield put(contactsActionCreators.getContactNotesSuccess({
        contact_id,
        notes: notesRes.data
      }));
      resolve();
    } else {
      reject();
    }
  } catch (e) {
    reject(e);
  }
}

export function* asyncCreateNewNote({ payload, resolve, reject }) {
  const { contact_id } = payload;

  try {
    const response = yield call(TieiT_Service,
      { api: `contacts/${contact_id}/notes`, method: 'POST', params: { ...payload } });

    if (response.status === 200) {
      resolve('Added note successfully');
    } else if (response.status === 401) {
      AsyncStorage.removeItem('@TIEIT:TOKEN');
      startLoginScene();
    } else {
      const res = JSON.parse(response._bodyText);
      reject(res.message);
    }
  } catch (e) {
    reject(e);
  }
}

export function* asyncAddContactToGroup({ payload, resolve, reject }) {
  const { contact_id, groups } = payload;

  try {
    const response = yield call(TieiT_Service,
      { api: `contacts/${contact_id}/groups`, method: 'POST', params: { groups } });

    if (response.status === 201) {
      resolve('Contact is added to the selected groups successfully.');
    } else {
      const res = JSON.parse(response._bodyText);
      reject(res.message);
    }
  } catch (e) {
    reject(e);
  }
}

export function* asyncUpdateContact({ payload, resolve, reject }) {
  const { contact_id } = payload;

  try {
    const response = yield call(TieiT_Service,
      { api: `contacts/${contact_id}`, method: 'PUT', params: { ...payload } });

    if (response.status === 200) {
      resolve('Contact is successfully updated.');
    } else {
      const res = JSON.parse(response._bodyText);
      reject(res.message);
    }
  } catch (e) {
    reject(e);
  }
}

export function *watchGetContactList() {
  while (true) {
    const action: Action = yield take(GET_CONTACT_LIST);
    yield* asyncGetContactList(action);
  }
}

export function *watchGetContactDetail() {
  while (true) {
    const action: Action = yield take(GET_CONTACT_DETAIL);
    yield* asyncGetContactDetail(action);
  }
}

export function *watchCreateNewContact() {
  while (true) {
    const action: Action = yield take(CREATE_NEW_CONTACT);
    yield* asyncCreateNewContact(action);
  }
}

export function *watchGetContactNotes() {
  while (true) {
    const action: Action = yield take(GET_CONTACT_NOTES);
    yield* asyncGetContactNotes(action);
  }
}

export function *watchCreateNewNote() {
  while (true) {
    const action: Action = yield take(CREATE_NEW_CONTACT_NOTES);
    yield* asyncCreateNewNote(action);
  }
}

export function *watchAddContactToGroup() {
  while (true) {
    const action: Action = yield take(ADD_CONTACT_TO_GROUP);
    yield* asyncAddContactToGroup(action);
  }
}

export function *watchUpdateContact() {
  while (true) {
    const action: Action = yield take(UPDATE_CONTACT);
    yield* asyncUpdateContact(action);
  }
}

export default function* (): Iterable {
  yield all([
    fork(watchGetContactList),
    fork(watchGetContactDetail),
    fork(watchCreateNewContact),
    fork(watchGetContactNotes),
    fork(watchCreateNewNote),
    fork(watchAddContactToGroup),
    fork(watchUpdateContact),
  ]);
}

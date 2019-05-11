// @flow

import { fork, all } from 'redux-saga/effects';
import {
  userSaga,
  contactsSaga,
  groupsSaga,
  sourcesSaga,
  companiesSaga,
  dealsSaga,
  countriesSaga,
  activitiesSaga
} from '../modules';

type Saga = Iterable<*>;

export default function* rootSaga(): Saga {
  yield all([
    fork(userSaga),
    fork(contactsSaga),
    fork(groupsSaga),
    fork(sourcesSaga),
    fork(companiesSaga),
    fork(dealsSaga),
    fork(countriesSaga),
    fork(activitiesSaga),
  ]);
}

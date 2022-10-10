import {all} from 'redux-saga/effects';

import auth from '@redux/sagas/auth';
import tag from '@redux/tags/sagas';
import global from '@main/redux/sagas';

export default function* rootSaga() {
  yield all([auth(), global()]);
}

export function defaultSagas() {
  return {
    auth,
    global,
    tag
  };
}

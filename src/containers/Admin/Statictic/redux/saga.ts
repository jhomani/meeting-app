import {takeLatest} from 'redux-saga/effects';
import {GET_STATISTICS_START} from './constants';

function* getStatistics(arg) {
  // let url, options;
  // const payload = arg.payload;

  yield console.log(arg, '<<<< Into Login Saga.....');
}

export function* staticticSaga() {
  yield takeLatest(GET_STATISTICS_START, getStatistics);
}

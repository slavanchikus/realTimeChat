import { fork } from 'redux-saga/effects';

import { chatSagas } from './chatSagas';

export default function* sagas() {
  yield fork(chatSagas);
}

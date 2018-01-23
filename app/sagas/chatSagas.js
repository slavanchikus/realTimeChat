import { fork, call, put, takeEvery } from 'redux-saga/effects';
import { getUser, createUser } from '../api/chatApi';

export function* fetchUser({ username, password }) {
  try {
    const payload = yield call(getUser, username, password);
    yield put({ type: 'USER_REQUEST_COMPLETE', payload });
  } catch (error) {
    yield put({ type: 'USER_REQUEST_ERROR' });
  }
}

export function* fetchNewUser({ username, password }) {
  try {
    const payload = yield call(createUser, username, password);
    yield put({ type: 'USER_CREATE_COMPLETE', payload });
  } catch (error) {
    yield put({ type: 'USER_CREATE_ERROR' });
  }
}


export function* watchChatRequest() {
  yield takeEvery('USER_REQUEST', fetchUser);
  yield takeEvery('USER_CREATE', fetchNewUser);
}

export function* chatSagas() {
  yield fork(watchChatRequest);
}

import { fork, call, put, takeEvery } from 'redux-saga/effects';
import openSocket from 'socket.io-client';

import { getUser, createUser, getMeassages, createMessage, getOneMessage, createBackgroundSrc } from '../api/chatApi';

const host = 'http://localhost:8000';
/* http://localhost:8000 */

export const socket = openSocket(host);

export function* fetchUser({ username, password }) {
  try {
    const payload = yield call(getUser, username, password);
    if (!localStorage.getItem('username_chat') && payload.user && payload.user.username) {
      localStorage.setItem('username_chat', username);
      localStorage.setItem('password_chat', password);
    }
    yield put({ type: 'USER_REQUEST_COMPLETE', payload });
  } catch (error) {
    yield put({ type: 'USER_REQUEST_ERROR' });
  }
}

export function* fetchNewUser({ username, password }) {
  try {
    const payload = yield call(createUser, username, password);
    if (payload.userId) {
      yield fetchUser({ username, password });
    } else if (payload.error) {
      yield put({ type: 'USER_CREATE_COMPLETE', payload });
    }
  } catch (error) {
    yield put({ type: 'USER_CREATE_ERROR' });
  }
}

export function* fetchMessages({ offset, username, roomId }) {
  try {
    const payload = yield call(getMeassages, offset, username, roomId);
    yield put({ type: 'MESSAGES_GET_COMPLETE', payload });
  } catch (error) {
    yield put({ type: 'MESSAGES_GET_ERROR' });
  }
}

export function* fetchOneMessages({ id, username, roomId }) {
  try {
    const payload = yield call(getOneMessage, id, username, roomId);
    yield put({ type: 'ONE_MESSAGE_GET_COMPLETE', payload });
  } catch (error) {
    yield put({ type: 'ONE_MESSAGE_GET_ERROR' });
  }
}

export function* fetchNewMessage({ content, userId, username, roomId }) {
  try {
    const payload = yield call(createMessage, content, userId, username, roomId);
    yield put({ type: 'MESSAGE_CREATE_COMPLETE', payload });
    socket.emit('new message', { id: payload._id });
  } catch (error) {
    yield put({ type: 'MESSAGE_CREATE_ERROR' });
  }
}

export function* fetchBackground({ backgroundSrc, roomId }) {
  try {
    const payload = yield call(createBackgroundSrc, backgroundSrc, roomId);
    yield put({ type: 'CREATE_BACKGROUND_COMPLETE', payload });
    socket.emit('new background', { backgroundSrc: payload.backgroundSrc });
  } catch (error) {
    yield put({ type: 'CREATE_BACKGROUND_ERROR' });
  }
}

export function* watchChatRequest() {
  yield takeEvery('USER_REQUEST', fetchUser);
  yield takeEvery('USER_CREATE', fetchNewUser);
  yield takeEvery('MESSAGES_GET', fetchMessages);
  yield takeEvery('ONE_MESSAGE_GET', fetchOneMessages);
  yield takeEvery('MESSAGE_CREATE', fetchNewMessage);
  yield takeEvery('CREATE_BACKGROUND', fetchBackground);
}

export function* chatSagas() {
  yield fork(watchChatRequest);
}

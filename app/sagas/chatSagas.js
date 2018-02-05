import { fork, call, put, takeEvery } from 'redux-saga/effects';
import openSocket from 'socket.io-client';

import { getUser, createUser, getMeassages, createMessage, getOneMessage } from '../api/chatApi';

export const socket = openSocket('http://localhost:8000');

export function* fetchUser({ username, password }) {
  try {
    const payload = yield call(getUser, username, password);
    if (!localStorage.getItem('username_chat')) {
      localStorage.setItem('username_chat', username);
      localStorage.setItem('password_chat', password);
    }
    console.log(payload.username);
    socket.emit('join chat', payload.username);
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

export function* fetchMessages({ offset }) {
  try {
    const payload = yield call(getMeassages, offset);
    yield put({ type: 'MESSAGES_GET_COMPLETE', payload });
  } catch (error) {
    yield put({ type: 'MESSAGES_GET_ERROR' });
  }
}

export function* fetchOneMessages({ id }) {
  try {
    const payload = yield call(getOneMessage, id);
    yield put({ type: 'ONE_MESSAGE_GET_COMPLETE', payload });
  } catch (error) {
    yield put({ type: 'ONE_MESSAGE_GET_ERROR' });
  }
}

export function* fetchNewMessage({ content, userId, username }) {
  try {
    const payload = yield call(createMessage, content, userId, username);
    yield put({ type: 'MESSAGE_CREATE_COMPLETE', payload });
    socket.emit('new message', { id: payload._id });
  } catch (error) {
    yield put({ type: 'MESSAGE_CREATE_ERROR' });
  }
}


export function* watchChatRequest() {
  yield takeEvery('USER_REQUEST', fetchUser);
  yield takeEvery('USER_CREATE', fetchNewUser);
  yield takeEvery('MESSAGES_GET', fetchMessages);
  yield takeEvery('ONE_MESSAGE_GET', fetchOneMessages);
  yield takeEvery('MESSAGE_CREATE', fetchNewMessage);
}

export function* chatSagas() {
  yield fork(watchChatRequest);
}

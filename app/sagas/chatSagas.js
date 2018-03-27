import { fork, call, put, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import socket from '../utils/socket';
import { getUser, createUser, getRooms, getMeassages, createMessage, getOneMessage, setRoomBackground, createRoom, openRoom, uploadFile } from '../api/chatApi';

export function* fetchUser({ username, password }) {
  for (let i = 0; i < 5; i += 1) {
    try {
      const payload = yield call(getUser, username, password);
      if (payload.error) {
        yield put({ type: 'USER_REQUEST_ERROR', payload });
        i = 6;
      } else {
        if (!localStorage.getItem('username_chat') && payload.user && payload.user.username) {
          localStorage.setItem('username_chat', username);
          localStorage.setItem('password_chat', password);
        }
        yield put({ type: 'USER_REQUEST_COMPLETE', payload });
        i = 6;
      }
    } catch (err) {
      if (i < 4) {
        yield call(delay, 200);
      } else {
        yield put({ type: 'USER_REQUEST_ERROR' });
      }
    }
  }
}

export function* fetchNewUser({ username, password }) {
  try {
    const payload = yield call(createUser, username, password);
    if (payload.error) {
      yield put({ type: 'USER_CREATE_ERROR', payload });
    } else {
      yield fetchUser({ username, password });
    }
  } catch (error) {
    yield put({ type: 'USER_CREATE_ERROR' });
  }
}

export function* fetchRooms() {
  try {
    const payload = yield call(getRooms);
    yield put({ type: 'ROOM_RESET_COMPLETE', payload });
  } catch (error) {
    yield put({ type: 'ROOM_RESET_ERROR' });
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

export function* fetchNewRoom({ roomName, description, password, userId }) {
  try {
    const payload = yield call(createRoom, roomName, description, password, userId);
    yield put({ type: 'ROOM_CREATE_COMPLETE', payload });
  } catch (error) {
    yield put({ type: 'ROOM_CREATE_ERROR' });
  }
}

export function* fetchRoom({ offset, username, roomId, password }) {
  try {
    const payload = yield call(openRoom, offset, username, roomId, password);
    if (payload.error) {
      yield put({ type: 'ROOM_OPEN_ERROR', payload });
    } else {
      yield put({ type: 'ROOM_OPEN_COMPLETE', payload });
      if (password.length > 0 && !localStorage.getItem(`${roomId}`)) {
        localStorage.setItem(`${roomId}`, password);
      }
    }
  } catch (error) {
    yield put({ type: 'ROOM_OPEN_ERROR' });
  }
}

export function* fetchRoomBackground({ backgroundSrc, roomId }) {
  try {
    const payload = yield call(setRoomBackground, backgroundSrc, roomId);
    yield put({ type: 'SET_ROOM_BACKGROUND_COMPLETE', payload });
    socket.emit('new background', { backgroundSrc: payload.backgroundSrc });
  } catch (error) {
    yield put({ type: 'SET_ROOM_BACKGROUND_ERROR' });
  }
}

export function* fetchNewFile({ data }) {
  try {
    const payload = yield call(uploadFile, data);
    yield put({ type: 'UPLOAD_FILE_COMPLETE', payload });
  } catch (error) {
    yield put({ type: 'UPLOAD_FILE_ERROR' });
  }
}

export function* watchChatRequest() {
  yield takeEvery('USER_REQUEST', fetchUser);
  yield takeEvery('USER_CREATE', fetchNewUser);
  yield takeEvery('MESSAGES_GET', fetchMessages);
  yield takeEvery('ONE_MESSAGE_GET', fetchOneMessages);
  yield takeEvery('MESSAGE_CREATE', fetchNewMessage);
  yield takeEvery('ROOM_RESET', fetchRooms);
  yield takeEvery('ROOM_CREATE', fetchNewRoom);
  yield takeEvery('ROOM_OPEN', fetchRoom);
  yield takeEvery('SET_ROOM_BACKGROUND', fetchRoomBackground);
  yield takeEvery('UPLOAD_FILE', fetchNewFile);
}

export function* chatSagas() {
  yield fork(watchChatRequest);
}

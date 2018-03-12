import { createSelector } from 'reselect';

import { unixstampConverter } from '../utils/convertUnixstamp';

export const userSelector = state => state.user;

const messagesStateSelector = state => state.messages;

export const roomsSelector = state => state.rooms;

export const uiStateSelector = state => state.uiState;

export const errorsSelector = state => state.errors;

export const messagesSelector = createSelector(
    messagesStateSelector,
    (messages) => {
      let storedUsername = '';
      return (
            messages.reduce((sum, currentItem) => {
              const date = unixstampConverter(currentItem.date);
              if (!sum.includes(date.day)) {
                sum.push(date.day);
              }
              let username = currentItem.username;
              if (currentItem.username === storedUsername && (sum[sum.length - 1] instanceof Object)) {
                username = null;
              } else {
                storedUsername = currentItem.username;
              }
              sum.push({ ...currentItem, username, date: date.hour });
              return sum;
            }, [])
      );
    }
);

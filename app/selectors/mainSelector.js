import { createSelector } from 'reselect';

import { unixstampConverter } from '../utils/convertUnixstamp';

export const userSelector = state => state.user;

export const messagesStateSelector = state => state.messages;

export const messagesSelector = createSelector(
    messagesStateSelector,
    messages => messages.reduce((sum, currentItem) => {
      const date = unixstampConverter(currentItem.date);
      if (!sum.includes(date.day)) {
        sum.push(date.day);
      }
      sum.push({ ...currentItem, date: date.hour });
      return sum;
    }, [])
);

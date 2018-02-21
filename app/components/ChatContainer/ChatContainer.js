import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Header from './Header/Header';
import InputForm from './InputForm/InputForm';
import MessagesContainer from './MessagesContainer/MessagesContainer';

import styles from './ChatContainer.module.styl';

export default class ChatContainer extends PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
    selectedRoom: PropTypes.object.isRequired,
    onCreateMessage: PropTypes.func.isRequired,
    onGetMessages: PropTypes.func.isRequired,
    onCreateBackgroundSrc: PropTypes.func.isRequired,
  };

  render() {
    const { user, messages, selectedRoom, onCreateMessage, onGetMessages, onCreateBackgroundSrc } = this.props;
    return (
      <div className={styles.container}>
        <Header
          onCreateBackgroundSrc={onCreateBackgroundSrc}
        />
        {messages.length > 0 &&
        <MessagesContainer
          user={user}
          selectedRoom={selectedRoom}
          messages={messages}
          onGetMessages={onGetMessages}
        />}
        <InputForm
          user={user}
          onCreateMessage={onCreateMessage}
        />
      </div>
    );
  }
}

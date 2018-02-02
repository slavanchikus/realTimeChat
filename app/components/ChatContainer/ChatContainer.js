import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import InputForm from './InputForm/InputForm';
import MessagesContainer from './MessagesContainer/MessagesContainer';

import styles from './ChatContainer.module.styl';

export default class ChatContainer extends PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
    onCreateMessage: PropTypes.func.isRequired,
    onGetMessages: PropTypes.func.isRequired
  };

  render() {
    const { user, messages, onCreateMessage, onGetMessages } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Чатик</h2>
        </div>
        {messages.length > 0 && <MessagesContainer
          currentUserId={user.userId}
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

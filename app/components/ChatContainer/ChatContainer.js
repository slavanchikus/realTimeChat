import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import InputForm from './InputForm/InputForm';
import MessagesContainer from './MessagesContainer/MessagesContainer';

import styles from './ChatContainer.module.styl';

export default class ChatContainer extends PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
    onCreateMessage: PropTypes.func.isRequired
  };

  render() {
    const { user, messages, onCreateMessage } = this.props;
    return (
      <div className={styles.container}>
        {messages.length > 0 &&
        <MessagesContainer
          userId={user.userId}
          messages={messages}
        />}
        <InputForm
          user={user}
          onCreateMessage={onCreateMessage}
        />
      </div>
    );
  }
}

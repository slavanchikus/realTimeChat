import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import openSocket from 'socket.io-client';

import InputForm from './InputForm/InputForm';
import MessagesContainer from './MessagesContainer/MessagesContainer';

import styles from './ChatContainer.module.styl';

const socket = openSocket('http://localhost:8000');

export default class ChatContainer extends PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
    onCreateMessage: PropTypes.func.isRequired
  };

  componentDidMount() {
    socket.emit('join chat', 1000);
    socket.on('success', () => console.log('you are connected'));
    socket.on('fetch message', () => console.log('you need to fetch new message'));
  }

  handleCreateMessage = (content, userId, username) => {
    this.props.onCreateMessage(content, userId, username);
    socket.emit('new message', 1000);
  };

  render() {
    const { user, messages } = this.props;
    return (
      <div className={styles.container}>
        {messages.length > 0 &&
          <MessagesContainer
            userId={user.userId}
            messages={messages}
          />}
        <InputForm
          user={user}
          onCreateMessage={this.handleCreateMessage}
        />
      </div>
    );
  }
}

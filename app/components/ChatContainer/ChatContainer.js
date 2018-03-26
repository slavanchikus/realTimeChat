import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import socket from '../../utils/socket';

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
    onGetOneMessage: PropTypes.func.isRequired,
    onSetRoomBackground: PropTypes.func.isRequired,
    onChangeRoomBackground: PropTypes.func.isRequired,
    onResetRoom: PropTypes.func.isRequired,
    onOpenRoom: PropTypes.func.isRequired
  };

  componentDidMount() {
    if (!this.props.selectedRoom._id) {
      const pathRoomId = window.location.hash.split('/').slice(-1)[0];
      const storageRoomPass = localStorage.getItem(`${pathRoomId}`) || '';
      if ((this.props.selectedRoom.isPrivate && storageRoomPass.length > 0) || !this.props.selectedRoom.isPrivate) {
        this.props.onOpenRoom(0, this.props.user.username, pathRoomId, storageRoomPass);
      } else {
        this.props.history.push('/');
      }
    }
    socket.emit('join chat', this.props.user.username, this.props.selectedRoom._id);
    window.onbeforeunload = () => {
      socket.emit('quit chat');
    };
    socket.on('fetch message', (data) => {
      this.props.onGetOneMessage(data.id, this.props.user.username, this.props.selectedRoom._id);
    });
    socket.on('change background', (data) => {
      this.props.onChangeRoomBackground(data.backgroundSrc);
    });
  }

  componentWillUnmount() {
    socket.emit('quit chat');
    this.props.onResetRoom();
  }

  render() {
    const { user, messages, selectedRoom, onCreateMessage, onGetMessages, onSetRoomBackground } = this.props;
    return (
      <div className={styles.container}>
        <Header
          selectedRoom={selectedRoom}
          onSetRoomBackground={onSetRoomBackground}
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
          selectedRoom={selectedRoom}
          onCreateMessage={onCreateMessage}
        />
      </div>
    );
  }
}

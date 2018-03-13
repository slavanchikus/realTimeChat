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
    onGetOneMessage: PropTypes.func.isRequired,
    onSetRoomBackground: PropTypes.func.isRequired,
    onChangeRoomBackground: PropTypes.func.isRequired,
    onResetRoom: PropTypes.func.isRequired,
    onOpenRoom: PropTypes.func.isRequired
  };

  componentDidMount() {
    if (!this.props.selectedRoom._id) {
      const pathRoomId = window.location.hash.split('/').slice(-1)[0];
      const storageRoomPass = localStorage.getItem(`${pathRoomId}`);
      if (storageRoomPass) {
        this.props.onOpenRoom(0, this.props.user.username, pathRoomId, storageRoomPass);
      } else {
        this.props.history.push('/');
      }
    }
  }

  componentWillUnmount() {
    this.props.onResetRoom();
  }

  render() {
    const { user, messages, selectedRoom, onCreateMessage, onGetMessages, onGetOneMessage, onSetRoomBackground, onChangeRoomBackground } = this.props;
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
          onGetOneMessage={onGetOneMessage}
          onChangeRoomBackground={onChangeRoomBackground}
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

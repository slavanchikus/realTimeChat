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
    onCreateBackground: PropTypes.func.isRequired,
    onChangeBackground: PropTypes.func.isRequired,
    onResetRoom: PropTypes.func.isRequired,
    onSelectRoom: PropTypes.func.isRequired
  };

  componentDidMount() {
    const pathRoomId = location.pathname.split('/').slice(-1)[0];
    if (!this.props.selectedRoom._id) {
      this.props.onSelectRoom(pathRoomId);
      this.props.onGetMessages(0, this.props.user.username, pathRoomId);
    }
  }

  componentWillUnmount() {
    this.props.onResetRoom();
  }

  render() {
    const { user, messages, selectedRoom, onCreateMessage, onGetMessages, onGetOneMessage, onCreateBackground, onChangeBackground } = this.props;
    return (
      <div className={styles.container}>
        <Header
          selectedRoom={selectedRoom}
          onCreateBackground={onCreateBackground}
        />
        {messages.length > 0 &&
        <MessagesContainer
          user={user}
          selectedRoom={selectedRoom}
          messages={messages}
          onGetMessages={onGetMessages}
          onGetOneMessage={onGetOneMessage}
          onChangeBackground={onChangeBackground}
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

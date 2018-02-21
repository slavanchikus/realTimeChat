import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { socket } from '../../sagas/chatSagas';

import { userRequest, userCreate, getMessages, getOneMessage, createMessage, createBackgroundSrc, changeBackgroundSrc } from '../../actions/actions';
import { userSelector, messagesSelector, roomsSelector } from '../../selectors/mainSelector';

import ChatContainer from '../ChatContainer/ChatContainer';
import Authentication from '../Authentication/Authentication';
import RoomSelector from '../RoomSelector/RoomSelector';

import styles from './MainPage.module.styl';

const mapStateToProps = state => ({
  user: userSelector(state),
  messages: messagesSelector(state),
  rooms: roomsSelector(state),
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ userRequest, userCreate, getMessages, getOneMessage, createMessage, createBackgroundSrc, changeBackgroundSrc }, dispatch);

const storageUsername = localStorage.getItem('username_chat');
const storagePassword = localStorage.getItem('password_chat');

class MainPage extends PureComponent {
  componentWillMount() {
    if (storageUsername && storagePassword) {
      this.props.userRequest(storageUsername, storagePassword);
    }
  }

  componentDidMount() {
    socket.on('fetch message', (data) => {
      this.props.getOneMessage(data.id, this.props.user.username);
    });
    socket.on('change background', (data) => {
      this.props.changeBackgroundSrc(data.backgroundSrc);
    });
    window.onbeforeunload = () => {
      socket.emit('quit chat', this.props.user.username);
    };
  }

  render() {
    const { user, messages, rooms } = this.props;
    return (
      <div className={styles.container}>
        {(!user.userId && !storageUsername) &&
          <Authentication
            user={this.props.user}
            onUserRequest={this.props.userRequest}
            onUserCreate={this.props.userCreate}
          />}
        {messages.length > 0 &&
          <ChatContainer
            user={user}
            messages={messages}
            selectedRoom={rooms.selectedRoom}
            onCreateMessage={this.props.createMessage}
            onGetMessages={this.props.getMessages}
            onCreateBackgroundSrc={this.props.createBackgroundSrc}
          />}
        {user.userId && messages.length < 1 &&
        <RoomSelector
          username={user.username}
          allRooms={rooms.allRooms}
          onGetMessages={this.props.getMessages}
        />}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

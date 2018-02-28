import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { BrowserRouter, Route } from 'react-router-dom';

import { userRequest, userCreate, getMessages, getOneMessage, createMessage,
          selectRoom, resetRoom, changeBackgroundSrc, createBackgroundSrc } from '../../actions/actions';
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
    bindActionCreators({
      userRequest,
      userCreate,
      getMessages,
      getOneMessage,
      createMessage,
      selectRoom,
      resetRoom,
      changeBackgroundSrc,
      createBackgroundSrc }, dispatch);

const storageUsername = localStorage.getItem('username_chat');
const storagePassword = localStorage.getItem('password_chat');

class MainPage extends PureComponent {
  componentWillMount() {
    if (storageUsername && storagePassword) {
      this.props.userRequest(storageUsername, storagePassword);
    }
  }

  render() {
    const { user, messages, rooms } = this.props;
    return (
      <BrowserRouter>
        <div className={styles.container}>
          {(!user.userId && !storageUsername) &&
          <Route
            exact
            path="/"
            render={() =>
              <Authentication
                user={this.props.user}
                onUserRequest={this.props.userRequest}
                onUserCreate={this.props.userCreate}
              />}
          />}
          {user.userId &&
          <Route
            exact
            path="/"
            render={routeProps =>
              <RoomSelector
                username={user.username}
                allRooms={rooms.allRooms}
                onGetMessages={this.props.getMessages}
                onSelectRoom={this.props.selectRoom}
                {...routeProps}
              />}
          />}
          {user.userId &&
          <Route
            path="/room"
            render={() =>
              <ChatContainer
                user={user}
                messages={messages}
                selectedRoom={rooms.selectedRoom}
                onCreateMessage={this.props.createMessage}
                onGetMessages={this.props.getMessages}
                onGetOneMessage={this.props.getOneMessage}
                onCreateBackground={this.props.createBackgroundSrc}
                onChangeBackground={this.props.changeBackgroundSrc}
                onResetRoom={this.props.resetRoom}
                onSelectRoom={this.props.selectRoom}
              />}
          />}
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

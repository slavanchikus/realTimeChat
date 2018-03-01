import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { BrowserRouter, Route } from 'react-router-dom';

import cx from 'classnames';

import { userRequest, userCreate, getMessages, getOneMessage, createMessage,
          selectRoom, resetRoom, changeBackgroundSrc, createBackgroundSrc } from '../../actions/actions';
import { userSelector, messagesSelector, roomsSelector, uiStateSelector } from '../../selectors/mainSelector';

import ChatContainer from '../ChatContainer/ChatContainer';
import Authentication from '../Authentication/Authentication';
import RoomSelector from '../RoomSelector/RoomSelector';

import styles from './MainPage.module.styl';

const mapStateToProps = state => ({
  user: userSelector(state),
  messages: messagesSelector(state),
  rooms: roomsSelector(state),
  uiState: uiStateSelector(state)
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

class MainPage extends Component {
  state = {
    blockUi: false
  };

  componentWillMount() {
    if (storageUsername && storagePassword) {
      this.props.userRequest(storageUsername, storagePassword);
    }
  }

  componentWillReceiveProps({ uiState }) {
    if (!uiState.isFetching && this.props.uiState.isFetching) {
      clearTimeout(this.loader);
      if (this.state.blockUi) this.setState({ blockUi: false });
    }
    if (uiState.isFetching && !this.props.uiState.isFetching) {
      this.loader = setTimeout(() => this.setState({ blockUi: true }), 1200);
    }
  }

  render() {
    const { user, messages, rooms } = this.props;
    const containerClass = cx(styles.container, {
      [styles.block_ui]: this.state.blockUi,
    });
    return (
      <BrowserRouter>
        <div className={containerClass}>
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
          <div className={styles.spinner} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

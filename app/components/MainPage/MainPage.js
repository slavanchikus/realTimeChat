import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { HashRouter, Route } from 'react-router-dom';

import cx from 'classnames';

import { userRequest, userCreate, getMessages, getOneMessage, createMessage, openLockedRoom,
          selectRoom, createRoom, resetRoom, changeBackgroundSrc, createBackgroundSrc, removeErrors } from '../../actions/actions';
import { userSelector, messagesSelector, roomsSelector, uiStateSelector, errorsSelector } from '../../selectors/mainSelector';

import ChatContainer from '../ChatContainer/ChatContainer';
import Authentication from '../Authentication/Authentication';
import RoomSelector from '../RoomSelector/RoomSelector';

import styles from './MainPage.module.styl';

const mapStateToProps = state => ({
  user: userSelector(state),
  messages: messagesSelector(state),
  rooms: roomsSelector(state),
  uiState: uiStateSelector(state),
  errors: errorsSelector(state)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
      userRequest,
      userCreate,
      getMessages,
      getOneMessage,
      createMessage,
      openLockedRoom,
      selectRoom,
      createRoom,
      resetRoom,
      changeBackgroundSrc,
      createBackgroundSrc,
      removeErrors }, dispatch);

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

  componentWillReceiveProps({ uiState, errors }) {
    if (!uiState.isFetching && this.props.uiState.isFetching) {
      clearTimeout(this.loader);
      if (this.state.blockUi) this.setState({ blockUi: false });
    }
    if (uiState.isFetching && !this.props.uiState.isFetching) {
      this.loader = setTimeout(() => this.setState({ blockUi: true }), 1200);
    }
    if (errors !== this.props.errors) {
      this.errorDelay = setTimeout(() => this.props.removeErrors(), 1200);
    }
  }

  render() {
    const { user, messages, rooms, errors } = this.props;
    const containerClass = cx(styles.container, {
      [styles.block_ui]: this.state.blockUi,
    });
    return (
      <HashRouter >
        <div className={containerClass}>
          {(!user.userId && !storageUsername) &&
          <Route
            exact
            path="/"
            render={() =>
              <Authentication
                user={user}
                errors={errors}
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
                user={user}
                allRooms={rooms.allRooms}
                onGetMessages={this.props.getMessages}
                onOpenLockedRoom={this.props.openLockedRoom}
                onSelectRoom={this.props.selectRoom}
                onCreateRoom={this.props.createRoom}
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
      </HashRouter >
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

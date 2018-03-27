import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { HashRouter, Route } from 'react-router-dom';

import cx from 'classnames';

import { userRequest, userCreate, getMessages, getOneMessage, createMessage, openRoom,
  createRoom, resetRoom, setRoomBackground, changeRoomBackground, removeErrors } from '../../actions/actions';
import { userSelector, messagesSelector, roomsSelector, uiStateSelector, errorsSelector } from '../../selectors/mainSelector';

import ChatContainer from '../ChatContainer/ChatContainer';
import Authentication from '../Authentication/Authentication';
import RoomSelector from '../RoomSelector/RoomSelector';

import styles from './MainPage.module.styl';

import { registerServiceWorker } from '../../utils/registerServiceWorker';

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
      openRoom,
      createRoom,
      resetRoom,
      setRoomBackground,
      changeRoomBackground,
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
    registerServiceWorker();
  }

  componentWillReceiveProps({ uiState, errors }) {
    if (!uiState.isFetching && this.props.uiState.isFetching) {
      clearTimeout(this.loader);
      if (this.state.blockUi) this.setState({ blockUi: false });
    }
    if (uiState.isFetching && !this.props.uiState.isFetching) {
      this.loader = setTimeout(() => this.setState({ blockUi: true }), 1200);
    }
    if (errors !== this.props.errors && Object.keys(errors).length > 0) {
      if (storagePassword && storageUsername && errors.userError === 'invalid user data') {
        localStorage.removeItem('username_chat');
        localStorage.removeItem('password_chat');
        this.setState({ blockUi: true });
      }
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
                errors={errors}
                allRooms={rooms.allRooms}
                selectedRoom={rooms.selectedRoom}
                onOpenRoom={this.props.openRoom}
                onCreateRoom={this.props.createRoom}
                {...routeProps}
              />}
          />}
          {user.userId &&
          <Route
            path="/room"
            render={routeProps =>
              <ChatContainer
                user={user}
                messages={messages}
                selectedRoom={rooms.selectedRoom}
                onCreateMessage={this.props.createMessage}
                onGetMessages={this.props.getMessages}
                onGetOneMessage={this.props.getOneMessage}
                onSetRoomBackground={this.props.setRoomBackground}
                onChangeRoomBackground={this.props.changeRoomBackground}
                onResetRoom={this.props.resetRoom}
                onOpenRoom={this.props.openRoom}
                {...routeProps}
              />}
          />}
          <div className={styles.spinner} />
        </div>
      </HashRouter >
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

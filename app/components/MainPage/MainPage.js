import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { socket } from '../../sagas/chatSagas';

import { userRequest, userCreate, getMessages, getOneMessage, createMessage } from '../../actions/actions';
import { userSelector, messagesSelector, settingsSelector } from '../../selectors/mainSelector';

import ChatContainer from '../ChatContainer/ChatContainer';
import Authentication from '../Authentication/Authentication';

import styles from './MainPage.module.styl';

const mapStateToProps = state => ({
  user: userSelector(state),
  messages: messagesSelector(state),
  settings: settingsSelector(state)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ userRequest, userCreate, getMessages, getOneMessage, createMessage }, dispatch);

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
    window.onbeforeunload = () => {
      socket.emit('quit chat', this.props.user.username);
    };
  }

  render() {
    const { user, messages, settings } = this.props;
    return (
      <div className={styles.container}>
        {(!user.userId && !storageUsername) &&
          <Authentication
            user={this.props.user}
            onUserRequest={this.props.userRequest}
            onUserCreate={this.props.userCreate}
          />}
        {user.userId &&
          <ChatContainer
            user={user}
            messages={messages}
            settings={settings}
            onCreateMessage={this.props.createMessage}
            onGetMessages={this.props.getMessages}
          />}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

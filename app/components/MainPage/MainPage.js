import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userRequest, userCreate, getMessages, createMessage } from '../../actions/actions';
import { userSelector, messagesSelector } from '../../selectors/mainSelector';

import ChatContainer from '../ChatContainer/ChatContainer';
import Authentication from '../Authentication/Authentication';
import ErrorContainer from '../ErrorContainer/ErrorContainer';

import styles from './MainPage.module.styl';

const mapStateToProps = state => ({
  user: userSelector(state),
  messages: messagesSelector(state)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ userRequest, userCreate, getMessages, createMessage }, dispatch);

const storageUsername = localStorage.getItem('username_chat');
const storagePassword = localStorage.getItem('password_chat');

class MainPage extends Component {
  componentWillMount() {
    if (storageUsername && storagePassword) {
      this.props.userRequest(storageUsername, storagePassword);
    }
  }

  componentWillReceiveProps({ user }) {
    if (!this.props.user.userId && user.userId) {
      this.props.getMessages();
    }
  }

  render() {
    const { user, messages } = this.props;
    return (
      <div className={styles.container}>
        {user.error &&
          <ErrorContainer
            error={user.error}
          />
        }
        {(!user.userId && !storageUsername) &&
          <Authentication
            onUserRequest={this.props.userRequest}
            onUserCreate={this.props.userCreate}
          />}
        {user.userId &&
          <ChatContainer
            user={user}
            messages={messages}
            onCreateMessage={this.props.createMessage}
          />}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

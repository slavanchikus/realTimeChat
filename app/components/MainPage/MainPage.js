import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userRequest, userCreate } from '../../actions/actions';
import { userSelector } from '../../selectors/mainSelector';

import ChatContainer from '../ChatContainer/ChatContainer';
import Authentication from '../Authentication/Authentication';
import ErrorContainer from '../ErrorContainer/ErrorContainer';

import styles from './MainPage.module.styl';

const mapStateToProps = state => ({
  user: userSelector(state),
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ userRequest, userCreate }, dispatch);

class MainPage extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className={styles.container}>
        {user.error &&
          <ErrorContainer
            error={user.error}
          />
        }
        {!user.userId &&
          <Authentication
            onUserRequest={this.props.userRequest}
            onUserCreate={this.props.userCreate}
          />}
        {user.userId &&
          <ChatContainer />}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

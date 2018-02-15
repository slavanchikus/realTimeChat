import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ErrorContainer from './ErrorContainer/ErrorContainer';

import styles from './Authentication.module.styl';

export default class Authentication extends PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
    onUserRequest: PropTypes.func.isRequired,
    onUserCreate: PropTypes.func.isRequired,
  };

  state = {
    username: '',
    password: '',
    isRegistration: false
  };

  handleClick = () => {
    const { username, password, isRegistration } = this.state;
    const usernameLen = !/^\s+$/.test(username) ? username.length : 0;
    const passwordLen = !/^\s+$/.test(password) ? password.length : 0;
    if (usernameLen > 1 || passwordLen > 1) {
      if (isRegistration) {
        this.props.onUserCreate(username, password);
      } else {
        this.props.onUserRequest(username, password);
      }
    }
  };

  putUsername = (e) => {
    this.setState({ username: e.target.value });
  };

  putPassword = (e) => {
    this.setState({ password: e.target.value });
  };

  render() {
    const { user } = this.props;
    const { isRegistration } = this.state;
    return (
      <div className={styles.container}>
        <h2>
          {isRegistration ? 'Регистрация' : 'Авторизация'}
        </h2>
        <input type="text" placeholder="Юзернейм" onChange={this.putUsername} maxLength={15} />
        <input type="text" placeholder="Пароль" onChange={this.putPassword} maxLength={10} />
        <div className={styles.button} onClick={this.handleClick}>
          {isRegistration ? 'Регистрировать' : 'Войти'}
        </div>
        <div className={styles.choose} onClick={() => this.setState({ isRegistration: !this.state.isRegistration })}>
          {isRegistration ? 'Авторизоваться' : 'Зарегистрироваться'}
        </div>
        {user.error &&
          <ErrorContainer
            error={user.error}
          />}
      </div>
    );
  }
}

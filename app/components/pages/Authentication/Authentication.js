import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ErrorContainer from '../../shared/ErrorContainer/ErrorContainer';

import styles from './Authentication.module.styl';

export default class Authentication extends PureComponent {
  static propTypes = {
    errors: PropTypes.object.isRequired,
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
    if (usernameLen > 1 && passwordLen > 1) {
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
    const { errors } = this.props;
    const { isRegistration, username, password } = this.state;
    return (
      <div className={styles.container}>
        <h2>
          {isRegistration ? 'Регистрация' : 'Авторизация'}
        </h2>
        <input type="text" placeholder="Юзернейм" onChange={this.putUsername} value={username} maxLength={15} />
        <input type="password" placeholder="Пароль" onChange={this.putPassword} value={password} maxLength={10} />
        <div className={styles.button} onClick={this.handleClick}>
          {isRegistration ? 'Регистрировать' : 'Войти'}
        </div>
        <div className={styles.choose} onClick={() => this.setState({ isRegistration: !this.state.isRegistration, username: '', password: '' })}>
          {isRegistration ? 'Авторизоваться' : 'Зарегистрироваться'}
        </div>
        {errors.userError &&
          <ErrorContainer
            error={errors.userError}
          />}
      </div>
    );
  }
}

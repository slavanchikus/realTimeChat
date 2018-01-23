import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Authentication.module.styl';

export default class Authentication extends Component {
  static propTypes = {
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
    if (isRegistration) {
      this.props.onUserCreate(username, password);
    } else {
      this.props.onUserRequest(username, password);
    }
  };

  putUsername = (e) => {
    this.setState({ username: e.target.value });
  };

  putPassword = (e) => {
    this.setState({ password: e.target.value });
  };

  render() {
    const { isRegistration } = this.state;
    return (
      <div className={styles.container}>
        <h2>
          {isRegistration ? 'Регистрация' : 'Авторизация'}
        </h2>
        <input type="text" placeholder="Юзернейм" onChange={this.putUsername} />
        <input type="text" placeholder="Пароль" onChange={this.putPassword} />
        <div className={styles.button} onClick={this.handleClick}>
          {isRegistration ? 'Регистрировать' : 'Войти'}
        </div>
        <div className={styles.choose} onClick={() => this.setState({ isRegistration: !this.state.isRegistration })}>
          {isRegistration ? 'Авторизоваться' : 'Зарегистрироваться'}
        </div>
      </div>
    );
  }
}

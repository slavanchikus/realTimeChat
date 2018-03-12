import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ErrorContainer from '../../../ErrorContainer/ErrorContainer';

import styles from '../RoomPopup.module.styl';

export default class PasswordForm extends PureComponent {
  static propTypes = {
    selectedRoomId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,
    onOpenRoom: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
  };

  state = {
    password: ''
  };

  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick = (e) => {
    if (!this.wrapper.contains(e.target)) {
      this.props.onClose();
    }
  };

  putPassword = (e) => {
    this.setState({ password: e.target.value.trim() });
  };

  handleButtonClick = () => {
    const { password } = this.state;
    const { selectedRoomId, username, onOpenRoom } = this.props;
    const passLen = !/^\s+$/.test(password) ? password.length : 0;
    if (passLen > 1) {
      onOpenRoom(0, username, selectedRoomId, password);
    }
  };

  render() {
    const { errors } = this.props;
    const { password } = this.state;
    return (
      <div ref={node => (this.wrapper = node)} className={styles.wrapper}>
        <div className={styles.form}>
          <p>Пароль</p>
          <input type="password" onChange={this.putPassword} value={password} maxLength={10} />
          {errors.roomError &&
          <ErrorContainer
            error={errors.roomError}
          />}
        </div>
        <div onClick={this.handleButtonClick} className={styles.button}>Войти</div>
      </div>
    );
  }
}

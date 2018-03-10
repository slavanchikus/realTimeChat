import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './RoomCreator.module.styl';

export default class RoomCreater extends PureComponent {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    onCreateRoom: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    description: '',
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

  handleButtonClick = () => {
    const { name, description, password } = this.state;
    const { userId } = this.props;
    const nameLen = !/^\s+$/.test(name) ? name.length : 0;
    const desLen = !/^\s+$/.test(description) ? description.length : 0;
    if (nameLen > 1 && desLen > 1) {
      this.props.onCreateRoom(name, description, password, userId);
      this.props.onClose();
    }
  };

  putName = (e) => {
    this.setState({ name: e.target.value });
  };

  putDescription = (e) => {
    this.setState({ description: e.target.value });
  };

  putPassword = (e) => {
    this.setState({ password: e.target.value.trim() });
  };

  render() {
    const { name, description, password } = this.state;
    return (
      <div className={styles.container}>
        <div ref={node => (this.wrapper = node)} className={styles.wrapper}>
          <div className={styles.form}>
            <p>Название комнаты</p>
            <input type="text" onChange={this.putName} value={name} maxLength={15} />
            <p>Описание комнаты</p>
            <input type="text" onChange={this.putDescription} value={description} maxLength={30} />
            <p>Пароль (необязательно)</p>
            <input type="password" onChange={this.putPassword} value={password} maxLength={10} />
          </div>
          <div onClick={this.handleButtonClick} className={styles.button}>Создать</div>
        </div>
      </div>
    );
  }
}

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './RoomCreator.module.styl';

export default class RoomCreater extends PureComponent {
  static propTypes = {
    onToggleVisibility: PropTypes.func.isRequired,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('click', this.handleClickOutside);
  }

  render() {
    const g = 'sss';
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.form}>
            <p>Название комнаты</p>
            <input type="text" />
            <p>Описание комнаты</p>
            <input type="text" />
            <p>Пароль (необязательно)</p>
            <input type="password" />
          </div>
          <div className={styles.button}>
            Создать
          </div>
        </div>
      </div>
    );
  }
};

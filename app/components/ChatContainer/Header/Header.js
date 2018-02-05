import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { socket } from '../../../sagas/chatSagas';

import styles from './Header.module.styl';

export default class Header extends PureComponent {

  state = {
    onlineUsers: [],
    visibleList: false
  };

  componentDidMount() {
    socket.on('user connect', (users) => {
      this.setState({ onlineUsers: users });
    });
    socket.on('user disconnect', (users) => {
      this.setState({ onlineUsers: users });
    });
  }

  handleOnlineClick = () => {
    this.setState({ visibleList: !this.state.visibleList });
  };

  render() {
    const { onlineUsers, visibleList } = this.state;
    return (
      <div className={styles.container}>
        <h2>Чатик</h2>
        {onlineUsers &&
        <div>
          {!visibleList && <div onClick={this.handleOnlineClick} className={styles.info}>{`Онлайн: ${onlineUsers.length}`}</div>}
          {visibleList && <div onClick={this.handleOnlineClick} className={styles.list}>{`${onlineUsers.join(', ')}`}</div>}
        </div>}
      </div>
    );
  }
}

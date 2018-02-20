import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { socket } from '../../../sagas/chatSagas';

import SideBar from './SideBar/SideBar';

import styles from './Header.module.styl';

export default class Header extends Component {
  state = {
    onlineUsers: [],
    typingUsers: [],
    visibleList: false
  };

  componentDidMount() {
    socket.on('user connect', (users) => {
      this.setState({ onlineUsers: users });
    });
    socket.on('user disconnect', (users) => {
      this.setState({ onlineUsers: users });
    });
    socket.on('user typing', (users) => {
      this.setState({ typingUsers: users });
    });
    socket.on('user stop typing', (users) => {
      this.setState({ typingUsers: users });
    });
  }

  handleOnlineClick = () => {
    this.setState({ visibleList: true });
    setTimeout(() => this.setState({ visibleList: false }), 1500);
  };

  render() {
    const { onlineUsers, typingUsers, visibleList } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.left_part}>
          <h2>Чатик</h2>
          {onlineUsers &&
          <div>
              {!visibleList &&
              <div onClick={this.handleOnlineClick} className={styles.info}>
                <div>{`Онлайн: ${onlineUsers.length}`}</div>
              </div>}
              {visibleList && <div className={styles.list}>{`${onlineUsers.join(', ')}`}</div>}
          </div>}
        </div>
        {typingUsers.length > 0 && !visibleList &&
        <div className={styles.typing}>
          <span className={styles.typping_names}>{typingUsers.join(', ')}</span> печатает
        </div>}
        <SideBar />
      </div>
    );
  }
}

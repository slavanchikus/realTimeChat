import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { socket } from '../../../sagas/chatSagas';

import SideBar from './SideBar/SideBar';

import styles from './Header.module.styl';

export default class Header extends Component {
  static propTypes = {
    selectedRoom: PropTypes.object.isRequired,
    onCreateBackground: PropTypes.func.isRequired,
  };

  state = {
    onlineUsersCount: 0,
    typingUser: '',
  };

  componentDidMount() {
    socket.on('user connect', (count) => {
      this.setState({ onlineUsersCount: count });
    });
    socket.on('user disconnect', () => {
      this.setState({ onlineUsersCount: this.state.onlineUsersCount - 1 });
    });
    socket.on('user typing', (user) => {
      this.setState({ typingUser: user });
    });
    socket.on('user stop typing', () => {
      this.setState({ typingUser: '' });
    });
  }

  render() {
    const { onlineUsersCount, typingUser } = this.state;
    const { selectedRoom, onCreateBackground } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.left_part}>
          <h2>{selectedRoom.roomName ? selectedRoom.roomName : 'Комната'}</h2>
          <div>{`Онлайн: ${onlineUsersCount}`}</div>
        </div>
        {typingUser.length > 0 &&
        <div className={styles.typing}>
          <span className={styles.typping_names}>{typingUser}</span> печатает
        </div>}
        <SideBar
          selectedRoom={selectedRoom}
          onCreateBackground={onCreateBackground}
        />
      </div>
    );
  }
}

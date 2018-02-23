import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './RoomSelector.module.styl';

export default class RoomSelector extends PureComponent {
  static propTypes = {
    username: PropTypes.string.isRequired,
    allRooms: PropTypes.array.isRequired,
    onSelectRoom: PropTypes.func.isRequired,
    onGetMessages: PropTypes.func.isRequired,
  };

  handleClick = (roomId) => {
    this.props.onGetMessages(0, this.props.username, roomId);
    this.props.onSelectRoom(roomId);
  };

  render() {
    const { allRooms } = this.props;
    return (
      <div className={styles.container}>
        <h2>Список комнат</h2>
        {allRooms.map(item =>
          <div
            key={item.roomName}
            className={styles.room}
            onClick={() => this.handleClick(item._id, item.roomName)}
          >
            <h3>{item.roomName}</h3>
            <div>{item.description}</div>
          </div>
        )}
      </div>
    );
  }
}

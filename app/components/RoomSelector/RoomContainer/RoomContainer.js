import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './RoomContainer.module.styl';

export default class RoomContainer extends PureComponent {
  static propTypes = {
    room: PropTypes.object.isRequired,
    roomIndex: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const { room, roomIndex, onClick } = this.props;
    return (
      <div
        className={room.isPrivate ? styles.locked_room : styles.room}
        onClick={() => onClick(room._id, roomIndex)}
      >
        <h3>{room.roomName}</h3>
        <div>{room.description}</div>
      </div>
    );
  }
}

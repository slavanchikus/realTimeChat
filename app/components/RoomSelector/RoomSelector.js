import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import styles from './RoomSelector.module.styl';

class RoomSelector extends PureComponent {
  static propTypes = {
    username: PropTypes.string.isRequired,
    allRooms: PropTypes.array.isRequired,
    onSelectRoom: PropTypes.func.isRequired,
    onGetMessages: PropTypes.func.isRequired,
  };

  handleClick = (roomId) => {
    this.props.onGetMessages(0, this.props.username, roomId);
    this.props.onSelectRoom(roomId);
    this.props.history.push(`/room/${roomId}`);
  };

  render() {
    const { allRooms } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Список комнат</h2>
          <div>Количество комнат: {allRooms.length}</div>
        </div>
        <div className={styles.rooms}>
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
      </div>
    );
  }
}

export default withRouter(RoomSelector);

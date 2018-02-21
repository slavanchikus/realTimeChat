import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './RoomSelector.module.styl';

export default class RoomSelector extends PureComponent {
  static propTypes = {
    username: PropTypes.string.isRequired,
    allRooms: PropTypes.array.isRequired,
    onGetMessages: PropTypes.func.isRequired
  };

  handleClick = (id) => {
    console.log(id);
    this.props.onGetMessages(0, this.props.username, id);
  };

  render() {
    const { allRooms } = this.props;
    return (
      <div className={styles.container}>
        {allRooms.map(item =>
          <div
            key={item.roomName}
            className={styles.room}
            onClick={() => this.handleClick(item._id)}
          >
            <h2>{item.roomName}</h2>
            <div>{item.description}</div>
          </div>
        )}
      </div>
    );
  }
}

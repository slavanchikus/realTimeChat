import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import RoomCreator from './RoomCreator/RoomCreater';

import styles from './RoomSelector.module.styl';

class RoomSelector extends PureComponent {
  static propTypes = {
    username: PropTypes.string.isRequired,
    allRooms: PropTypes.array.isRequired,
    onSelectRoom: PropTypes.func.isRequired,
    onGetMessages: PropTypes.func.isRequired,
  };

  state = {
    showCreator: false
  };

  handleRoomClick = (roomId) => {
    this.props.onGetMessages(0, this.props.username, roomId);
    this.props.onSelectRoom(roomId);
    this.props.history.push(`/room/${roomId}`);
  };

  toggleCreatorVisibility = () => {
    this.setState({ showCreator: !this.state.showCreator });
  };

  render() {
    const { showCreator } = this.state;
    const { allRooms } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h2>Список комнат</h2>
            <div>Количество комнат: {allRooms.length}</div>
          </div>
          <div className={styles.plus} onClick={this.toggleCreatorVisibility} >+</div>
        </div>
        <div className={styles.rooms}>
          {allRooms.map(item =>
            <div
              key={item.roomName}
              className={styles.room}
              onClick={() => this.handleRoomClick(item._id, item.roomName)}
            >
              <h3>{item.roomName}</h3>
              <div>{item.description}</div>
            </div>
          )}
        </div>
        {showCreator &&
        <RoomCreator
          onToggleVisibility={this.toggleCreatorVisibility}
        />}
      </div>
    );
  }
}

export default withRouter(RoomSelector);

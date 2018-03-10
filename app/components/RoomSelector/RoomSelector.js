import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import RoomCreator from './RoomCreator/RoomCreater';
import RoomContainer from './RoomContainer/RoomContainer';

import styles from './RoomSelector.module.styl';

class RoomSelector extends PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
    allRooms: PropTypes.array.isRequired,
    onGetMessages: PropTypes.func.isRequired,
    onSelectRoom: PropTypes.func.isRequired,
    onCreateRoom: PropTypes.func.isRequired,
  };

  state = {
    showCreator: false
  };

  handleRoomClick = (roomId, index) => {
    const { user, allRooms, onGetMessages, onSelectRoom } = this.props;
    if (allRooms[index].isPrivate) {

    } else {
      onGetMessages(0, user.username, roomId);
      onSelectRoom(roomId);
      this.props.history.push(`/room/${roomId}`);
    }
  };

  toggleCreatorVisibility = () => {
    this.setState({ showCreator: !this.state.showCreator });
  };

  render() {
    const { showCreator } = this.state;
    const { user, allRooms, onCreateRoom } = this.props;
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
          {allRooms.map((item, index) =>
            <RoomContainer
              key={item.roomName}
              room={item}
              roomIndex={index}
              onClick={this.handleRoomClick}
            />
          )}
        </div>
        {showCreator &&
        <RoomCreator
          userId={user.userId}
          onCreateRoom={onCreateRoom}
          onClose={this.toggleCreatorVisibility}
        />}
      </div>
    );
  }
}

export default withRouter(RoomSelector);

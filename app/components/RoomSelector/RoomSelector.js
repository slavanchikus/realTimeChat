import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import RoomPopup from './RoomPopup/RoomPopup';
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
    showCreatorForm: false,
    lockedRoomId: '',
  };

  handleRoomClick = (roomId, index) => {
    const { user, allRooms, onGetMessages, onSelectRoom } = this.props;
    if (allRooms[index].isPrivate) {
      this.setState({ lockedRoomId: roomId });
    } else {
      onGetMessages(0, user.username, roomId, '');
      onSelectRoom(roomId);
      this.props.history.push(`/room/${roomId}`);
    }
  };

  handlePlusClick = () => {
    this.setState({ showCreatorForm: true });
  };

  handlePopupClose = () => {
    this.setState({ lockedRoomId: '', showCreatorForm: false });
  };

  render() {
    const { showCreatorForm, lockedRoomId } = this.state;
    const { user, allRooms, onCreateRoom, onGetMessages } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h2>Список комнат</h2>
            <div>Количество комнат: {allRooms.length}</div>
          </div>
          <div className={styles.plus} onClick={this.handlePlusClick} >+</div>
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
        {(showCreatorForm || lockedRoomId.length > 0) &&
        <RoomPopup
          showCreatorForm={showCreatorForm}
          lockedRoomId={lockedRoomId}
          user={user}
          onCreateRoom={onCreateRoom}
          onGetMessages={onGetMessages}
          onClose={this.handlePopupClose}
        />}
      </div>
    );
  }
}

export default withRouter(RoomSelector);

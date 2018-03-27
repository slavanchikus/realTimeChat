import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import RoomPopup from './RoomPopup/RoomPopup';
import RoomContainer from './RoomContainer/RoomContainer';

import styles from './RoomSelector.module.styl';

class RoomSelector extends PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    allRooms: PropTypes.array.isRequired,
    selectedRoom: PropTypes.object.isRequired,
    onOpenRoom: PropTypes.func.isRequired,
    onCreateRoom: PropTypes.func.isRequired,
  };

  state = {
    showCreatorForm: false,
    showPasswordForm: false,
    selectedRoomId: '',
  };

  componentWillReceiveProps({ selectedRoom }) {
    if (Object.keys(selectedRoom).length > 0) {
      this.props.history.push(`/room/${this.state.selectedRoomId}`);
    }
  }

  handleRoomClick = (roomId, index) => {
    const { user, allRooms, onOpenRoom } = this.props;
    if (allRooms[index].isPrivate) {
      const storageRoomPass = localStorage.getItem(`${roomId}`);
      if (storageRoomPass) {
        onOpenRoom(0, user.username, roomId, storageRoomPass);
        this.setState({ selectedRoomId: roomId });
      } else {
        this.setState({ selectedRoomId: roomId, showPasswordForm: true });
      }
    } else {
      this.setState({ selectedRoomId: roomId });
      onOpenRoom(0, user.username, roomId, '');
    }
  };

  handlePlusClick = () => {
    this.setState({ showCreatorForm: true });
  };

  handlePopupClose = () => {
    this.setState({ showPasswordForm: false, showCreatorForm: false });
  };

  render() {
    const { showCreatorForm, showPasswordForm, selectedRoomId } = this.state;
    const { user, errors, allRooms, onCreateRoom, onOpenRoom } = this.props;
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
        {(showCreatorForm || showPasswordForm) &&
        <RoomPopup
          selectedRoomId={selectedRoomId}
          showCreatorForm={showCreatorForm}
          showPasswordForm={showPasswordForm}
          user={user}
          errors={errors}
          onCreateRoom={onCreateRoom}
          onOpenRoom={onOpenRoom}
          onClose={this.handlePopupClose}
        />}
      </div>
    );
  }
}

export default withRouter(RoomSelector);

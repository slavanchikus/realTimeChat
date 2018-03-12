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
    onOpenLockedRoom: PropTypes.func.isRequired,
    onSelectRoom: PropTypes.func.isRequired,
    onCreateRoom: PropTypes.func.isRequired,
  };

  state = {
    showCreatorForm: false,
    showPasswordForm: false,
    selectedRoomId: '',
  };

  componentWillReceiveProps({  }) {
    /*this.props.onSelectRoom(this.state.selectedRoomId);
    this.props.history.push(`/room/${this.state.selectedRoomId}`);*/
  }

  handleRoomClick = (roomId, index) => {
    const { user, allRooms, onGetMessages } = this.props;
    if (allRooms[index].isPrivate) {
      this.setState({ selectedRoomId: roomId, showPasswordForm: true });
    } else {
      this.setState({ selectedRoomId: roomId });
      onGetMessages(0, user.username, roomId);
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
    const { user, allRooms, onCreateRoom, onOpenLockedRoom } = this.props;
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
          onCreateRoom={onCreateRoom}
          onOpenLockedRoom={onOpenLockedRoom}
          onClose={this.handlePopupClose}
        />}
      </div>
    );
  }
}

export default withRouter(RoomSelector);

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import PasswordForm from './PasswordForm/PasswordForm';
import CreatorForm from './CreatorForm/CreatorForm';

import styles from './RoomPopup.module.styl';

export default class RoomPopup extends PureComponent {
  static propTypes = {
    showCreatorForm: PropTypes.bool.isRequired,
    lockedRoomId: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    onGetMessages: PropTypes.func.isRequired,
    onCreateRoom: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  render() {
    const { user, showCreatorForm, lockedRoomId, onCreateRoom, onGetMessages, onClose } = this.props;
    return (
      <div className={styles.container}>
        {showCreatorForm &&
        <CreatorForm
          userId={user.userId}
          onCreateRoom={onCreateRoom}
          onClose={onClose}
        />}
        {lockedRoomId.length > 0 &&
        <PasswordForm
          username={user.username}
          lockedRoomId={lockedRoomId}
          onGetMessages={onGetMessages}
          onClose={onClose}
        />}
      </div>
    );
  }
}

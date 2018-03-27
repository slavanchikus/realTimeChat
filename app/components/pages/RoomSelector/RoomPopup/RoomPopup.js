import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import PasswordForm from './PasswordForm/PasswordForm';
import CreatorForm from './CreatorForm/CreatorForm';

import styles from './RoomPopup.module.styl';

export default class RoomPopup extends PureComponent {
  static propTypes = {
    selectedRoomId: PropTypes.string.isRequired,
    showCreatorForm: PropTypes.bool.isRequired,
    showPasswordForm: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    onOpenRoom: PropTypes.func.isRequired,
    onCreateRoom: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  render() {
    const { user, errors, selectedRoomId, showCreatorForm, showPasswordForm, onCreateRoom, onOpenRoom, onClose } = this.props;
    return (
      <div className={styles.container}>
        {showCreatorForm &&
        <CreatorForm
          userId={user.userId}
          onCreateRoom={onCreateRoom}
          onClose={onClose}
        />}
        {showPasswordForm &&
        <PasswordForm
          selectedRoomId={selectedRoomId}
          username={user.username}
          errors={errors}
          onOpenRoom={onOpenRoom}
          onClose={onClose}
        />}
      </div>
    );
  }
}

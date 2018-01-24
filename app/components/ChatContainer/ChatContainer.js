import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InputForm from './InputForm/InputForm';

import styles from './ChatContainer.module.styl';

export default class ChatContainer extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    onCreateMessage: PropTypes.func.isRequired
  };

  render() {
    const { user, onCreateMessage } = this.props;
    return (
      <div className={styles.container}>
        <InputForm
          user={user}
          onCreateMessage={onCreateMessage}
        />
      </div>
    );
  }
}

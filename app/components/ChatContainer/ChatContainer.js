import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './ChatContainer.module.styl';

export default class ChatContainer extends Component {
  render() {
    return (
      <div className={styles.container}>
        Chat
      </div>
    );
  }
}

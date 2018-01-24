import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import styles from './MessagesContainer.module.styl';

export default class MessagesContainer extends PureComponent {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    messages: PropTypes.array.isRequired,
  };

  render() {
    const { messages } = this.props;
    return (
      <div className={styles.container}>
        {messages.map(message =>
          <div key={message._id} className={styles.message}>
            <span>
              {message.username}
            </span>
            <p>
              {message.content}
            </p>
          </div>)}
      </div>
    );
  }
}

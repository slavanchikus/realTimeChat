import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './MessagesContainer.module.styl';

export default class MessagesContainer extends PureComponent {
  static propTypes = {
    messages: PropTypes.array.isRequired,
  };

  render() {
    const { messages } = this.props;
    return (
      <div className={styles.container}>
        {messages.map(message =>
          <div key={message._id}>
            {`${message.username}: ${message.content}`}
          </div>)}
      </div>
    );
  }
}

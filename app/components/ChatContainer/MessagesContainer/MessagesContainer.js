import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import { unixstampConverter } from '../../../utils/convertUnixstamp';

import styles from './MessagesContainer.module.styl';

export default class MessagesContainer extends PureComponent {
  static propTypes = {
    currentUserId: PropTypes.string.isRequired,
    messages: PropTypes.array.isRequired,
  };

  componentDidMount() {
    this.container.scrollTop = this.container.scrollHeight;
  }

  componentDidUpdate() {
    this.container.scrollTop = this.container.scrollHeight;
  }

  setClassName = userId => cx(styles.message, {
    [styles.own_message]: userId === this.props.currentUserId
  });

  render() {
    const { messages } = this.props;
    return (
      <div ref={node => (this.container = node)} className={styles.container}>
        {messages.map(message =>
          <div key={message._id} className={this.setClassName(message.userId)}>
            <span className={styles.username}>
              {message.username}
            </span>
            <p>
              {message.content}
            </p>
            <span className={styles.date}>
              {unixstampConverter(message.date)}
            </span>
          </div>)}
      </div>
    );
  }
}

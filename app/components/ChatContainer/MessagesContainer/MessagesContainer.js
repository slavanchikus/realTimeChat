import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import styles from './MessagesContainer.module.styl';

export default class MessagesContainer extends PureComponent {
  static propTypes = {
    currentUserId: PropTypes.string.isRequired,
    messages: PropTypes.array.isRequired,
    onGetMessages: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.container.scrollTop = this.container.scrollHeight;
  }

  componentDidUpdate(prevProps) {
    const prevLast = prevProps.messages[prevProps.messages.length - 1];
    const currLast = this.props.messages[this.props.messages.length - 1];
    if (prevLast._id !== currLast._id) {
      this.container.scrollTop = this.container.scrollHeight;
    } else {
      this.container.scrollTop = this.container.scrollHeight - this.previousScrollHeight;
    }
  }

  setClassName = userId => cx(styles.message, {
    [styles.own_message]: userId === this.props.currentUserId
  });

  handleScroll = () => {
    const { onGetMessages, messages } = this.props;
    if (this.container.scrollTop === 0) {
      this.previousScrollHeight = this.container.scrollHeight - this.container.scrollTop;
      onGetMessages(messages.length);
    }
  };

  render() {
    const { messages } = this.props;
    return (
      <div ref={node => (this.container = node)} className={styles.container} onScroll={this.handleScroll}>
        {messages.map((message) => {
          if (message instanceof Object) {
            return (
              <div key={message._id} className={this.setClassName(message.userId)}>
                <span className={styles.username}>
                  {message.username}
                </span>
                <p>
                  {message.content}
                </p>
                <span className={styles.date}>
                  {message.date}
                </span>
              </div>
            );
          }
          return (
            <div className={styles.day} key={message}>{message}</div>
          );
        })}
      </div>
    );
  }
}

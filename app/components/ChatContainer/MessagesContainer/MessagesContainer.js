import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Message from './Message/Message';

import styles from './MessagesContainer.module.styl';

export default class MessagesContainer extends PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
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
      if (document.hasFocus() === true) this.container.scrollTop = this.container.scrollHeight;
    } else {
      this.container.scrollTop = this.container.scrollHeight - this.previousScrollHeight;
    }
  }

  handleScroll = () => {
    const { onGetMessages, messages } = this.props;
    if (this.container.scrollTop === 0) {
      this.previousScrollHeight = this.container.scrollHeight - this.container.scrollTop;
      onGetMessages(messages.length, this.props.user.username);
    }
  };

  render() {
    const { messages, user } = this.props;
    return (
      <div ref={node => (this.container = node)} className={styles.container} onScroll={this.handleScroll}>
        {messages.map((message) => {
          if (message instanceof Object) {
            return (
              <Message key={message._id} currentUserId={user.userId} message={message} />
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

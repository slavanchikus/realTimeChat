import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Message from './Message/Message';

import styles from './MessagesContainer.module.styl';

export default class MessagesContainer extends PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
    selectedRoom: PropTypes.object.isRequired,
    onGetMessages: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.container.scrollTop = this.container.scrollHeight;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.messages.length !== this.props.messages.length) {
      const prevLast = prevProps.messages[prevProps.messages.length - 1];
      const currLast = this.props.messages[this.props.messages.length - 1];
      if (prevLast._id !== currLast._id) {
        if (document.hasFocus() === true) this.container.scrollTop = this.container.scrollHeight;
      } else {
        this.container.scrollTop = this.container.scrollHeight - this.previousScrollHeight;
      }
    }
  }

  handleScroll = () => {
    const { messages, selectedRoom, onGetMessages } = this.props;
    if (this.container.scrollTop === 0) {
      this.previousScrollHeight = this.container.scrollHeight - this.container.scrollTop;
      onGetMessages(messages.length, this.props.user.username, selectedRoom._id);
    }
  };

  render() {
    const { messages, user, selectedRoom } = this.props;
    return (
      <div
        id="messagescontainer"
        ref={node => (this.container = node)}
        className={styles.container}
        onScroll={this.handleScroll}
        style={{
          background: `url(${selectedRoom.backgroundSrc}) 50% 50% / cover no-repeat rgb(54, 54, 54)`
        }}
      >
        {messages.map((message) => {
          if (message instanceof Object) {
            return (
              <Message
                key={message._id}
                user={user}
                selectedRoom={selectedRoom}
                message={message}
              />
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import { emojiData } from '../../../../utils/emojiData';
import styles from './Message.module.styl';

const emojiSrc = 'data:image/gif;base64,R0lGODlhAQABAPAAAAAAAP///yH5BAUAAAAALAAAAAABAAEAAAICRAEAOw==';

export default class MessagesContainer extends Component {
  static propTypes = {
    currentUserId: PropTypes.string.isRequired,
    message: PropTypes.object.isRequired,
  };


  shouldComponentUpdate() {
    return false;
  }

  setClassName = userId => cx(styles.message, {
    [styles.own_message]: userId === this.props.currentUserId
  });

  handleText = (content) => {
    let text = content;
    const emojisCode = content.match(/!#[\w]*#/g);
    if (emojisCode) {
      [...new Set(emojisCode)].map((item) => {
        const unicode = new RegExp(item, 'g');
        text = text.replace(unicode, `<img id=${item}
                                  src=${emojiSrc} 
                                  class=${styles.emoji} 
                                  style="background-position:${emojiData[item].backgroundPosition}"/>`);
      });
    }
    return text;
  };

  render() {
    const { message, currentUserId } = this.props;
    return (
      <div className={this.setClassName(currentUserId, message.userId)}>
        <span className={styles.username}>
          {message.username}
        </span>
        <p dangerouslySetInnerHTML={{ __html: this.handleText(message.content) }} />
        <span className={styles.date}>
          {message.date}
        </span>
      </div>
    );
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import MediaContainer from '../../../../shared/MediaContainer/MediaContainer';

import { emojiData } from '../../../../../utils/emojiData';
import styles from './Message.module.styl';

const emojiSrc = 'data:image/gif;base64,R0lGODlhAQABAPAAAAAAAP///yH5BAUAAAAALAAAAAABAAEAAAICRAEAOw==';

export default class Message extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
    selectedRoom: PropTypes.object.isRequired,
  };

  shouldComponentUpdate() {
    return false;
  }

  setClassName = (userId, username) => cx(styles.message, {
    [styles.own_message]: userId === this.props.user.userId,
    [styles.same_author]: !username
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
    const urlMatchs = content.match(/(?:^|[^"'])((ftp|http|https|file):\/\/[\S]+(\b|$))/gim);
    if (urlMatchs) {
      urlMatchs.forEach((url) => {
        text = text.replace(url, `<a href=${url} target="_blank">cсылка</a>`);
      });
    }
    return text;
  };

  render() {
    const { message, user, selectedRoom } = this.props;
    const color = selectedRoom.participants[message.username] && selectedRoom.participants[message.username].color;
    return (
      <div className={this.setClassName(message.userId, message.username)}>
        <span
          className={styles.username}
          style={{ color: color ? `#${color}` : '' }}
        >
          {message.username}
        </span>
        <p dangerouslySetInnerHTML={{ __html: this.handleText(message.content) }} />
        {message.files && message.files.length > 0 &&
        <MediaContainer viewOnly files={message.files} />}
        <span className={styles.date}>
          {message.date}
        </span>
      </div>
    );
  }
}

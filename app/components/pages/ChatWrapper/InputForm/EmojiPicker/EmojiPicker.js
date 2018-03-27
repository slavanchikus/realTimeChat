import React, { Component } from 'react';

import { emojiData } from '../../../../../utils/emojiData';

import styles from './EmojiPicker.module.styl';

export default class EmojiPicker extends Component {

  handleMouseDown = (e) => {
    e.preventDefault();
    const attr = e.target.getAttribute('data');
    if (attr === 'emoji') {
      this.props.onMouseDown(e.target);
    }
  };

  render() {
    return (
      <div className={styles.container} onMouseDown={this.handleMouseDown} onMouseLeave={this.props.onMouseLeave} onMouseEnter={this.props.onMouseEnter}>
        {Object.keys(emojiData).map(key =>
          <div
            key={key}
            id={key}
            data="emoji"
            className={styles.emoji}
            style={{ backgroundPosition: emojiData[key].backgroundPosition }}
          />
          )}
      </div>
    );
  }
}

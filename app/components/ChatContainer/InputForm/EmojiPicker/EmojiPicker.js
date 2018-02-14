import React, { Component } from 'react';

import { emojiData } from '../../../../utils/emojiData';

import styles from './EmojiPicker.module.styl';

export default class EmojiPicker extends Component {

  handleClick = (e) => {
    const attr = e.target.getAttribute('data');
    if (attr === 'emoji') {
      this.props.onClick(e.target);
    }
  };

  render() {
    return (
      <div className={styles.container} onClick={this.handleClick} onMouseLeave={this.props.onMouseLeave}>
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

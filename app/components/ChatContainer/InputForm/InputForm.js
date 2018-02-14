import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import EmojiPicker from './EmojiPicker/EmojiPicker';

import { socket } from '../../../sagas/chatSagas';
import { saveSelection, pasteNodeAtCaret } from './inputUtils/inputUtils';

import styles from './InputForm.module.styl';

const placeholder = 'Напишите сообщение...';
const emojiSrc = 'data:image/gif;base64,R0lGODlhAQABAPAAAAAAAP///yH5BAUAAAAALAAAAAABAAEAAAICRAEAOw==';

export default class InputForm extends PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
    onCreateMessage: PropTypes.func.isRequired
  };

  state = {
    inputRange: null,
    isTyping: false,
    expandEmoji: false
  };

  componentDidMount() {
    this.input.innerText = placeholder;
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.isTyping && this.state.isTyping) {
      socket.emit('start typing', this.props.user.username);
    } else {
      socket.emit('stop typing', this.props.user.username);
    }
  }

  handleClick = () => {
    const contentLength = !/^\s+$/.test(this.input.innerText) ? this.input.innerText.length : 0;
    const { userId, username } = this.props.user;
    if (this.input.innerText !== placeholder && contentLength > 0) {
      this.props.onCreateMessage(this.input.innerText, userId, username);
      this.input.innerHTML = '';
      this.input.focus();
    }
  };

  handleKeyDown = (e) => {
    if (!this.state.isTyping) {
      this.setState({ isTyping: true });
    }
    if (e.ctrlKey && e.keyCode === 13) {
      this.post.click();
    }
    if (this.typingDelay !== undefined) {
      clearTimeout(this.typingDelay);
    }
    this.typingDelay = setTimeout(() => this.setState({ isTyping: false }), 1000);
  };

  handleFocus = () => {
    const content = this.input.innerText;
    if (content === placeholder) {
      this.input.innerText = '';
    }
    this.input.addEventListener('keydown', this.handleKeyDown);
  };

  handleBlur = () => {
    const contentLength = !/^\s+$/.test(this.input.innerText) ? this.input.innerText.length : 0;
    if (contentLength < 1) {
      this.input.innerHTML = placeholder;
    }
    this.input.removeEventListener('keydown', this.handleKeyDown);
  };

  handleSelection = () => {
    this.setState({ inputRange: saveSelection() });
  };

  handleEmojiPick = (target) => {
    const emojAtr = {
      id: target.id,
      src: emojiSrc,
      class: styles.emoji_input,
      style: target.style.cssText
    };
    pasteNodeAtCaret('img', this.state.inputRange, emojAtr);
  };

  toggleExpandState = () => {
    this.setState({ expandEmoji: !this.state.expandEmoji });
  };

  render() {
    const { expandEmoji } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.emoji_wrapper}>
          <div className={styles.emoji_picker} onMouseEnter={this.toggleExpandState} />
          {expandEmoji && <EmojiPicker onClick={this.handleEmojiPick} onMouseLeave={this.toggleExpandState} />}
        </div>
        <div
          contentEditable
          ref={node => (this.input = node)}
          className={styles.input}
          spellCheck={false}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onSelect={this.handleSelection}
        />
        <div
          ref={node => (this.post = node)}
          className={styles.post}
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import EmojiPicker from './EmojiPicker/EmojiPicker';

import { socket } from '../../../sagas/chatSagas';
import { saveSelection, pasteNodeAtCaret, formatContent, countLength } from './inputUtils/inputUtils';

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
    expandEmoji: false,
    contentLength: 0
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
    const { contentLength } = this.state;
    const { userId, username } = this.props.user;
    const content = formatContent(this.input.innerHTML);
    if (this.input.innerText !== placeholder && contentLength > 0) {
      this.props.onCreateMessage(content, userId, username);
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

  handleKeyPress = (e) => {
    if (this.state.contentLength > 199) e.preventDefault();
  };

  handleFocus = () => {
    const content = this.input.innerText;
    if (content === placeholder) {
      this.input.innerText = '';
    }
    this.input.addEventListener('keydown', this.handleKeyDown);
    this.input.addEventListener('paste', this.handlePaste);
  };

  handleBlur = () => {
    const { contentLength } = this.state;
    if (contentLength < 1) {
      this.input.innerHTML = placeholder;
    }
    this.input.removeEventListener('keydown', this.handleKeyDown);
    this.input.removeEventListener('paste', this.handlePaste);
  };

  handlePaste = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const { contentLength } = this.state;
    if (contentLength < 199) {
      let pastedData = e.clipboardData.getData('text/plain') || window.clipboardData.getData('Text');
      if (contentLength + pastedData.length > 199) {
        pastedData = pastedData.slice(0, (199 - contentLength));
      }
      if (typeof e.clipboardData === 'undefined') {
        this.state.inputRange.deleteContents();
        this.state.inputRange.insertNode(document.createTextNode(pastedData));
      } else {
        this.state.inputRange.deleteContents();
        document.execCommand('insertText', false, pastedData);
      }
    }
    return null;
  };

  handleSelection = () => {
    this.setState({ inputRange: saveSelection(), contentLength: countLength(this.input) });
  };

  handleMouseEnter = () => {
    if (!this.state.expandEmoji) this.showTimer = setTimeout(() => this.setState({ expandEmoji: true }), 100);
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
    }
  };

  handleMouseLeave = () => {
    if (this.showTimer) {
      clearTimeout(this.showTimer);
    }
    this.hideTimer = setTimeout(() => this.setState({ expandEmoji: false }), 600);
  };

  handleEmojiPick = (target) => {
    if (this.state.contentLength < 199) {
      const content = this.input.innerText;
      if (content === placeholder) {
        this.input.focus();
      }
      const emojAtr = {
        id: target.id,
        src: emojiSrc,
        class: styles.emoji_input,
        style: target.style.cssText
      };
      pasteNodeAtCaret('img', this.state.inputRange, emojAtr);
    }
    return null;
  };

  render() {
    const { expandEmoji } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.emoji_wrapper}>
          <div
            className={styles.emoji_picker}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          />
          {expandEmoji &&
          <EmojiPicker
            onClick={this.handleEmojiPick}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          />}
        </div>
        <div
          contentEditable
          ref={node => (this.input = node)}
          className={styles.input}
          spellCheck={false}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onSelect={this.handleSelection}
          onKeyPress={this.handleKeyPress}
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

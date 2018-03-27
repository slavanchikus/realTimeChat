import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import EmojiPicker from './EmojiPicker/EmojiPicker';
import AttachmentsContainer from './AttachmentsContainer/AttachmentsContainer';

import socket from '../../../../utils/socket';
import { saveSelection, pasteNodeAtCaret, formatContent, countLength } from './inputUtils';

import styles from './InputForm.module.styl';

const placeholder = 'Напишите сообщение...';
const emojiSrc = 'data:image/gif;base64,R0lGODlhAQABAPAAAAAAAP///yH5BAUAAAAALAAAAAABAAEAAAICRAEAOw==';

export default class InputForm extends PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
    selectedRoom: PropTypes.object.isRequired,
    onCreateMessage: PropTypes.func.isRequired,
  };

  state = {
    inputRange: null,
    isTyping: false,
    isFocused: false,
    expandEmoji: false,
    files: [],
    contentLength: 0,
  };

  componentDidMount() {
    this.input.innerText = placeholder;
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.isTyping && this.state.isTyping) {
      socket.emit('start typing', this.props.user.username);
    } else if (prevState.isTyping && !this.state.isTyping) {
      socket.emit('stop typing', this.props.user.username);
    }
  }

  handleClick = () => {
    const { contentLength, files } = this.state;
    const { userId, username } = this.props.user;
    const content = formatContent(this.input.innerHTML);
    if (this.input.innerText !== placeholder && contentLength > 0) {
      this.props.onCreateMessage(content, files, userId, username, this.props.selectedRoom._id);
      this.input.innerHTML = '';
      this.input.focus();
    }
  };

  handleInput = () => {
    if (!this.state.isTyping) {
      this.setState({ isTyping: true });
    }
    if (this.typingDelay !== undefined) {
      clearTimeout(this.typingDelay);
    }
    this.typingDelay = setTimeout(() => this.setState({ isTyping: false }), 1000);
  };

  handleKeyDown = (e) => {
    if (e.ctrlKey && e.keyCode === 13) {
      this.post.click();
    }
  };

  handleKeyPress = (e) => {
    if (this.state.contentLength > 199) e.preventDefault();
  };

  handleFocus = () => {
    const content = this.input.innerText;
    if (content === placeholder) {
      this.input.innerText = '';
    }
    this.setState({ isFocused: true });
    this.input.addEventListener('keydown', this.handleKeyDown);
    this.input.addEventListener('paste', this.handlePaste);
  };

  handleBlur = () => {
    const { contentLength } = this.state;
    if (contentLength < 1) {
      this.input.innerHTML = placeholder;
    }
    this.setState({ isFocused: false });
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
    const content = this.input.innerText;
    if (content === placeholder) {
      this.input.focus();
    }
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

  handleFileState = (file) => {
    this.setState({ files: [...this.state.files, file]});
  };

  render() {
    const { expandEmoji, isFocused, contentLength } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.input_wrapper}>
          <AttachmentsContainer
            onHandleFileState={this.handleFileState}
          />
          <div
            contentEditable
            ref={node => (this.input = node)}
            className={styles.input}
            spellCheck={false}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onInput={this.handleInput}
            onSelect={this.handleSelection}
            onKeyPress={this.handleKeyPress}
          />
          {(isFocused || contentLength > 0) &&
          <div className={styles.emoji_wrapper}>
            <div
              className={styles.emoji_picker}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
            />
            {expandEmoji &&
            <EmojiPicker
              onMouseDown={this.handleEmojiPick}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
            />}
          </div>}
        </div>
        <div
          ref={node => (this.post = node)}
          className={styles.post}
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

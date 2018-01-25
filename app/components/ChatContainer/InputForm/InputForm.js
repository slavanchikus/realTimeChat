import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './InputForm.module.styl';

const placeholder = 'Напишите сообщение...';

export default class InputForm extends PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
    onCreateMessage: PropTypes.func.isRequired
  };

  handleClick = () => {
    const content = this.input.innerText;
    const { userId, username } = this.props.user;

    this.props.onCreateMessage(content, userId, username);
    this.input.innerHTML = '';
    this.input.focus();
  };

  handleKeyDown = (e) => {
    if (e.ctrlKey && e.keyCode === 13) {
      this.post.click();
    }
  };

  handleFocus = () => {
    const content = this.input.innerText;
    if (content === placeholder) {
      this.input.innerText = '';
    }
    this.input.addEventListener('keydown', this.handleKeyDown);
  };

  handleBlur = () => {
    const content = this.input.innerText;
    if (content.length < 1) {
      this.input.innerHTML = placeholder;
    }
    this.input.removeEventListener('keydown', this.handleKeyDown);
  };

  render() {
    return (
      <div className={styles.container}>
        <div
          contentEditable
          ref={node => (this.input = node)}
          className={styles.input}
          spellCheck={false}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        >
          {placeholder}
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

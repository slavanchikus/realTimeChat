import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './InputForm.module.styl';

export default class InputForm extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    onCreateMessage: PropTypes.func.isRequired
  };

  handleClick = () => {
    const content = this.input.innerText;
    const { userId, username } = this.props.user;

    this.props.onCreateMessage(content, userId, username);
  };

  render() {
    return (
      <div className={styles.container}>
        <div
          contentEditable
          ref={node => (this.input = node)}
          className={styles.input}
          spellCheck={false}
        />
        <div
          className={styles.post}
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

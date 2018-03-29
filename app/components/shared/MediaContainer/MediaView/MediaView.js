import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './MediaView.module.styl';

export default class MediaView extends PureComponent {
  static propTypes = {
    files: PropTypes.array.isRequired,
    fileIndex: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      fileIndex: props.fileIndex
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.getElementById('messagescontainer').style.overflowY = 'hidden';
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.getElementById('messagescontainer').style.overflowY = 'scroll';
  }

  moveRight = () => {
    const { fileIndex } = this.state;
    let nextIndex;
    if (fileIndex < this.props.files.length - 1) {
      nextIndex = fileIndex + 1;
    } else {
      nextIndex = 0;
    }
    this.setState({ fileIndex: nextIndex });
  };

  moveLeft = () => {
    const { fileIndex } = this.state;
    let nextIndex;
    if (fileIndex === 0) {
      nextIndex = this.props.files.length - 1;
    }
    if (fileIndex < this.props.files.length && fileIndex !== 0) {
      nextIndex = fileIndex - 1;
    }
    this.setState({ fileIndex: nextIndex });
  };

  handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      this.props.onClose();
    }
    if (e.keyCode === 39) {
      this.moveRight();
    } if (e.keyCode === 37) {
      this.moveLeft();
    }
  };

  handleOutsideClick = (e) => {
    if (!this.wrapper.contains(e.target)) {
      this.props.onClose();
    }
  };

  render() {
    const { fileIndex } = this.state;
    const { files, onClose } = this.props;
    return (
      <div className={styles.overlay} onClick={this.handleOutsideClick}>
        <div ref={(node) => { this.wrapper = node; }} className={styles.file_wrapper}>
          <img
            alt="  упс"
            src={files[fileIndex].path}
            className={styles.view}
            onClick={this.moveRight}
          />
          <div className={styles.delete} onClick={() => onClose()} />
        </div>
      </div>
    );
  }
}

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import MediaView from './MediaView/MediaView';

import styles from './MediaContainer.module.styl';

export default class MediaPreview extends PureComponent {
  static propTypes = {
    files: PropTypes.array.isRequired,
    onDelete: PropTypes.func,
    viewOnly: PropTypes.bool
  };

  static defaultProps = {
    viewOnly: false,
    onDelete: () => null
  };

  state = {
    expandView: false,
    fileIndex: null
  };

  render() {
    const { expandView, fileIndex } = this.state;
    const { files, viewOnly, onDelete } = this.props;
    return (
      <div className={styles.container}>
        {files.map((item, index) =>
          <div key={index} className={styles.item}>
            <img
              alt="  упс"
              src={item.path}
              className={styles.preview}
              onClick={() => this.setState({ expandView: true, fileIndex: index })}
            />
            {!viewOnly &&
            <div className={styles.delete} onClick={() => onDelete(index)} />}
          </div>)}
        {expandView &&
        <MediaView
          files={files}
          fileIndex={fileIndex}
          onClose={() => this.setState({ expandView: false })}
        />}
      </div>
    );
  }
}

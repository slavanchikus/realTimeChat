import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { validateImg } from '../../../utils/validateImg';

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
    fileIndex: null,
    files: []
  };

  async componentDidMount() {
    const promises = this.props.files.map(async (item) => {
      const isImgValid = await validateImg(item.path);
      if (isImgValid) {
        return { ...item, valid: true };
      }
      return { ...item, valid: false };
    });
    const files = await Promise.all(promises);
    this.setState({ files });
  }

  render() {
    const { expandView, files, fileIndex } = this.state;
    const { viewOnly, onDelete } = this.props;
    if (files.length < 0) return null;
    return (
      <div className={styles.container}>
        {files.map((item, index) =>
          <div key={index} className={styles.item}>
            <img
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

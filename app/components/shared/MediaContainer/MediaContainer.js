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
    files: this.props.files
  };

  async componentDidMount() {
    const promises = this.state.files.map(async (item) => {
      const isImgValid = await validateImg(item.path);
      if (isImgValid) {
        return { ...item, valid: true };
      }
      return { ...item, valid: false, path: 'http://www.clker.com/cliparts/0/4/6/1/11949904011525963418file_broken.svg.med.png' };
    });
    const files = await Promise.all(promises);
    this.setState({ files });
  }

  render() {
    const { expandView, files, fileIndex } = this.state;
    const { viewOnly, onDelete } = this.props;
    return (
      <div className={styles.container}>
        {files.map((item, index) =>
          <div key={index} className={styles.item}>
            <img
              src={item.path}
              className={styles.preview}
              onClick={() => item.valid && this.setState({ expandView: true, fileIndex: index })}
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

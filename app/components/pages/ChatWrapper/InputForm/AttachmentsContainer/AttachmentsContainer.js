import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { uploadImg } from './attachmentsApi';

import styles from './AttachmentsContainer.module.styl';

export default class AttachmentsContainer extends PureComponent {
  static propTypes = {
    onHandleFileState: PropTypes.func.isRequired,
  };

  state = {
    file: null
  };

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.file && this.state.file) {
      this.props.onHandleFileState(this.state.file);
    }
  }

  handleUploadImg = async (e) => {
    if (!this.state.file) {
      const file = e.target.files[0];
      if (file) {
        const data = new FormData();
        data.append('file', file, file.name);
        const resposne = await uploadImg(data);
        this.setState({ file: { type: 'img', path: resposne.path }});
      }
    }
    return null;
  };

  render() {
    return (
      <div className={styles.upload}>
        <form>
          <input name="image" type="file" accept="image/png, image/jpeg" onChange={this.handleUploadImg} />
        </form>
      </div>
    );
  }
}

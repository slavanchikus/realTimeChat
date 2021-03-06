import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import { validateImg } from '../../../../../utils/validateImg';
import styles from './SideBar.module.styl';

export default class SideBar extends Component {
  static propTypes = {
    selectedRoom: PropTypes.object.isRequired,
    onSetRoomBackground: PropTypes.func.isRequired,
  };

  state = {
    expanded: false,
    backgroundSetting: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.expanded && this.state.expanded) {
      document.addEventListener('click', this.handleOutsideClick);
    } else if (prevState.expanded && !this.state.expanded) {
      document.removeEventListener('click', this.handleOutsideClick);
    }
  }

  toggleExpandState = () => {
    this.setState({ expanded: !this.state.expanded, backgroundSetting: false });
  };

  toggleBackgroundSetting = () => {
    this.setState({ backgroundSetting: !this.state.backgroundSetting });
  };

  handleInputPaste = async(e) => {
    const pastedData = e.clipboardData.getData('text/plain') || window.clipboardData.getData('Text');
    const urlsArr = pastedData.match(/(\b(https?|ftp|file|http):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig);
    if (urlsArr) {
      const imgUrl = urlsArr[0].match(/\.(jpeg|jpg|gif|png)$/ig);
      if (imgUrl) {
        const isImgValid = await validateImg(urlsArr[0]);
        if (isImgValid) {
          this.props.onSetRoomBackground(urlsArr[0], this.props.selectedRoom._id);
          this.setState({ expanded: false, backgroundSetting: false });
        }
      }
    }
  };

  handleOutsideClick = (e) => {
    if (!this.wrapper.contains(e.target)) {
      this.setState({ expanded: false, backgroundSetting: false });
    }
  };

  render() {
    const { expanded, backgroundSetting } = this.state;
    const hamburgerClass = cx(styles.hamburger, {
      [styles.active_hamburger]: expanded,
    });
    return (
      <div className={styles.container} ref={node => (this.wrapper = node)}>
        <div className={styles.menu_icon} onClick={this.toggleExpandState}>
          <div className={hamburgerClass} />
        </div>
        {expanded &&
        <div className={styles.items_conteiner}>
          {!backgroundSetting ? <div onClick={this.toggleBackgroundSetting}>Изменить фон</div> :
          <div>Ссылка на пикчу:<input type="text" onPaste={this.handleInputPaste} /></div>
          }
        </div>}
      </div>
    );
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import { validateImg } from '../../../../utils/validateImg';
import styles from './SideBar.module.styl';

export default class SideBar extends Component {
  /* static propTypes = {
    onCreateBackgroundSrc: PropTypes.func.isRequired,
  }; */

  state = {
    expanded: false,
    backgroundSetting: false
  };

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
          /* this.props.onCreateBackgroundSrc(urlsArr[0]); */
          this.setState({ expanded: false, backgroundSetting: false });
        }
      }
    }
  };

  render() {
    const { expanded, backgroundSetting } = this.state;
    const hamburgerClass = cx(styles.hamburger, {
      [styles.active_hamburger]: expanded,
    });
    return (
      <div className={styles.container}>
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

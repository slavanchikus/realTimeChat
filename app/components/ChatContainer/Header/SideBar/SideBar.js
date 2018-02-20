import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

import styles from './SideBar.module.styl';

export default class SideBar extends Component {
  state = {
    expanded: false
  };

  toggleExpandState = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { expanded } = this.state;
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
          <div>Изменить фон</div>
        </div>}
      </div>
    );
  }
}

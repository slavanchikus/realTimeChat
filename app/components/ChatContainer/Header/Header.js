import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './Header.module.styl';

export default class Header extends PureComponent {

  render() {
    return (
      <div className={styles.container}>
        <h2>Чатик</h2>
      </div>
    );
  }
}

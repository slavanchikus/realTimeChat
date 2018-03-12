import React from 'react';

import styles from './ErrorContainer.module.styl';

export default ({ error }) => (
  <div className={styles.container}>
    {error === 'invalid user data' && 'Неправильный логин или пароль'}
    {error === 'user exists' && 'Юзернейм занят'}
  </div>
  );

import React from 'react';
import LoaderLogo from 'assets/spinner.svg';

import styles from './Spinner.module.scss';

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <img src={LoaderLogo.src} alt="loader" />
    </div>
  );
};

export default Spinner;

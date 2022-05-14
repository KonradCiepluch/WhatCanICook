import React from 'react';

import timeLogo from 'assets/clock.svg';
import styles from './TimeWidget.module.scss';

type Props = { time: number };

const TimeWidget = ({ time }: Props) => {
  return (
    <span className={styles.time}>
      <img src={timeLogo.src} alt="clock" />
      {time} min.
    </span>
  );
};

export default TimeWidget;

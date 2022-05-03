import React, { useMemo } from 'react';

import barsImages from 'utils/difficultyLevel';
import styles from './LevelWidget.module.scss';

type Props = { level: 1 | 2 | 3 };

const LevelWidget = ({ level }: Props) => {
  const { src, title } = useMemo(() => barsImages[level], [level]);

  return (
    <span className={styles.level}>
      <img src={src} alt="bars" />
      {title}
    </span>
  );
};

export default LevelWidget;

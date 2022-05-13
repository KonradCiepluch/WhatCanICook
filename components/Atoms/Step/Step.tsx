import React from 'react';
import Image from 'next/image';

import styles from './Step.module.scss';

type Props = { description: string; index: number; photo?: string; video?: string };

const Step = ({ description, photo, index }: Props) => {
  return (
    <li className={styles.step}>
      <div className={styles.step__content}>
        <h3>Krok {index}</h3>
        <p>{description}</p>
      </div>
      {photo ? (
        <div className={styles.step__image}>
          <Image src={photo} layout="fill" alt="step-image" />
        </div>
      ) : null}
    </li>
  );
};

export default Step;

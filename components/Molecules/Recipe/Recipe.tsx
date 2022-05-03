import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { LevelWidget, TimeWidget } from 'components/Atoms';
import styles from './Recipe.module.scss';

type Props = { name: string; difficultyLevel: 1 | 2 | 3; photo: string; category: string; subcategory: string; time: number; className?: string };

const Recipe = ({ name, difficultyLevel, photo, category, subcategory, time, className = '' }: Props) => {
  return (
    <li className={`${styles.recipe} ${className}`}>
      <Link href={`/przepisy/${category}/${subcategory}/${name}`}>
        <a className={styles.recipe__link}>
          <Image src={photo} layout="fill" />
          <span className={styles.recipe__title}> {name}</span>
        </a>
      </Link>
      <div className={styles.recipe__details}>
        <LevelWidget level={difficultyLevel} />
        <TimeWidget time={time} />
      </div>
    </li>
  );
};

export default Recipe;

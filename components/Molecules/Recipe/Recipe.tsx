import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { IRecipe } from 'interfaces/Recipe';
import { LevelWidget, TimeWidget } from 'components/Atoms';
import styles from './Recipe.module.scss';

interface IProps extends IRecipe {
  className?: string;
}

const Recipe = ({ name, difficultyLevel, photo, category: { categorySlug, subcategorySlug }, slug, time, className = '' }: IProps) => {
  return (
    <li className={`${styles.recipe} ${className}`}>
      <Link href={`/przepisy/${categorySlug}/${subcategorySlug}/${slug}`}>
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

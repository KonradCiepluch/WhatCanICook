import React from 'react';

import { ICategory } from 'interfaces/Menu';
import { NavLink } from 'components/Atoms';
import styles from './Navigation.module.scss';

interface INavigation {
  categories: ICategory[];
}

const Navigation = ({ categories }: INavigation) => {
  const recipes = categories.map(({ name, subcategories }) => (
    <li key={name} className={styles.categories__item}>
      <NavLink href={`/przepisy/${name}`} label={name} className={styles.categories__link} />
      <ul className={styles.subcategories}>
        {subcategories.map(({ name: subName }) => (
          <li key={subName} className={styles.subcategories__item}>
            <NavLink label={subName} className={styles.subcategories__link} href={`/przepisy/${name}/${subName}`} />
          </li>
        ))}
      </ul>
    </li>
  ));
  return (
    <ul className={styles.nav__list}>
      <li className={styles.nav__item}>
        Przepisy
        <ul className={styles.categories}>{recipes}</ul>
      </li>
    </ul>
  );
};

export default Navigation;

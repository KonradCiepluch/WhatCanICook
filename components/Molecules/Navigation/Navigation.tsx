import React from 'react';

import getSlug from 'utils/getSlug';
import { ICategory } from 'interfaces';
import { NavLink } from 'components/Atoms';
import styles from './Navigation.module.scss';

interface INavigation {
  categories: ICategory[];
}

const Navigation = ({ categories }: INavigation) => {
  const recipes = categories.map(({ name, subcategories }) => {
    const nameUrl = getSlug(name);
    return (
      <li key={name} className={styles.categories__item}>
        <NavLink href={`/przepisy/${nameUrl}`} label={name} className={styles.categories__link} />
        <ul className={styles.subcategories}>
          {subcategories.map(({ name: subName }) => {
            const subNameUrl = getSlug(subName);
            return (
              <li key={subName} className={styles.subcategories__item}>
                <NavLink label={subName} className={styles.subcategories__link} href={`/przepisy/${nameUrl}/${subNameUrl}`} />
              </li>
            );
          })}
        </ul>
      </li>
    );
  });
  return (
    <ul className={styles.nav__list}>
      <li className={styles.nav__item}>
        Przepisy
        <ul className={styles.categories}>{recipes}</ul>
      </li>
      <li className={styles.nav__item}>
        <NavLink href={`/blog`} label="Blog" className={styles.nav__link} />
      </li>
    </ul>
  );
};

export default Navigation;

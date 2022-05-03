import React from 'react';

import { Recipe } from 'components/Molecules';
import { IRecipe } from 'interfaces/Recipe';
import styles from './Subcategory.module.scss';

type Props = { subcategory: string; recipes: IRecipe[] };

const Subcategory = ({ subcategory, recipes }: Props) => {
  const items = recipes.map(({ category: { name: catName, subcategory: subName }, ...args }) => (
    <Recipe key={args.name} category={catName} subcategory={subName} {...args} />
  ));

  return (
    <section className={styles.subcategory}>
      <h1 className={styles.subcategory__heading}>{subcategory}</h1>
      {items.length ? (
        <ul className={styles.subcategory__list}>{items}</ul>
      ) : (
        <p className={styles.subcategory__info}>Brak przepisów w tej kategorii</p>
      )}
    </section>
  );
};

export default Subcategory;

import React, { useMemo } from 'react';

import { Recipe, BreadCrumbs } from 'components/Molecules';
import { IRecipe } from 'interfaces/Recipe';
import styles from './Subcategory.module.scss';

type Props = { category: string; subcategory: string; categorySlug: string; subcategorySlug: string; recipes: IRecipe[] };

const Subcategory = ({ category, subcategory, categorySlug, subcategorySlug, recipes }: Props) => {
  const items = recipes.map((args) => <Recipe key={args.name} {...args} />);

  const linkLabels = useMemo(() => {
    return [
      { label: 'What can I cook', href: '/' },
      { label: category, href: `/przepisy/${categorySlug}` },
      { label: subcategory, href: `/przepisy/${categorySlug}/${subcategorySlug}` },
    ];
  }, [category, subcategory, categorySlug, subcategorySlug]);

  return (
    <section className={styles.subcategory}>
      <BreadCrumbs links={linkLabels} />
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

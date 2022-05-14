import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { BreadCrumbs } from 'components/Molecules';
import { ICategory } from 'interfaces/Menu';
import styles from './Category.module.scss';

type Props = { category: ICategory };

const Category = ({ category: { name, subcategories, slug } }: Props) => {
  const linkLabels = useMemo(() => {
    return [
      { label: 'What can I cook', href: '/' },
      { label: name, href: `/przepisy/${slug}` },
    ];
  }, [name, slug]);

  const items = subcategories.map(({ name: subName, photo, slug: subSlug }) => (
    <li key={subName}>
      <Link href={`/przepisy/${slug}/${subSlug}`}>
        <a className={styles.category__link}>
          <Image src={photo} layout="fill" />
          <span className={styles.category__title}>{subName}</span>
        </a>
      </Link>
    </li>
  ));

  return (
    <section className={styles.category}>
      <BreadCrumbs links={linkLabels} />
      <h1 className={styles.category__heading}>Przepisy {name}</h1>
      <ul className={styles.category__list}>{items}</ul>
    </section>
  );
};

export default Category;

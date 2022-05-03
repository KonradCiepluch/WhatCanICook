import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { ICategory } from 'interfaces/Menu';
import styles from './Category.module.scss';

type Props = { category: ICategory };

const Category = ({ category: { name, subcategories } }: Props) => {
  const items = subcategories.map(({ name: subName, photo }) => (
    <li key={subName}>
      <Link href={`/przepisy/${name}/${subName}`}>
        <a className={styles.category__link}>
          <Image src={photo} layout="fill" />
          <span className={styles.category__title}>{subName}</span>
        </a>
      </Link>
    </li>
  ));

  return (
    <section className={styles.category}>
      <h1 className={styles.category__heading}>Przepisy {name}</h1>
      <ul className={styles.category__list}>{items}</ul>
    </section>
  );
};

export default Category;

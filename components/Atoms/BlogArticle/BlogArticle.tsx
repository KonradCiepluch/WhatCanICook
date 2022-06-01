import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { IBlog } from 'interfaces';
import NavLink from '../NavLink/NavLink';
import styles from './BlogArticle.module.scss';

type Props = { blog: IBlog };

const BlogArticle = ({ blog: { photo, title, author, date, id, summary } }: Props) => {
  return (
    <article className={styles.article}>
      <Link href={`/blog/${id}`}>
        <div className={styles.article__image}>
          <Image src={photo} layout="fill" />
          <h4 className={styles.article__title}>{title}</h4>
        </div>
      </Link>
      <p className={styles.article__author}>
        Autor: <span>{author}</span>
      </p>
      <p className={styles.article__date}>
        Opublikowano: <span>{date}</span>
      </p>
      <p className={styles.article__content}>
        {summary.slice(0, 300)}...
        <NavLink label="czytaj dalej" href={`/blog/${id}`} className={styles.article__link} />
      </p>
    </article>
  );
};

export default BlogArticle;

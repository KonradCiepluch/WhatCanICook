import React, { useMemo } from 'react';
import Image from 'next/image';

import { IBlogPost } from 'interfaces';
import { BreadCrumbs } from 'components/Molecules';
import styles from './BlogItem.module.scss';

type Props = { blogPost: IBlogPost };

const BlogItem = ({ blogPost: { id, title, photo, date, content, author } }: Props) => {
  const linkLabels = useMemo(
    () => [
      { label: 'What can I cook', href: '/' },
      { label: 'Blog', href: '/blog' },
      { label: title, href: `/blog/${id}` },
    ],
    [id, title]
  );

  const blogContent = content.map(({ heading, paragraphs, list }) => (
    <article key={heading} className={`${styles.wrapper__content} ${styles.article}`}>
      <h3 className={styles.article__title}>{heading}</h3>
      {paragraphs
        ? paragraphs.map((item) => (
            <p key={item} className={styles.article__text}>
              {item}
            </p>
          ))
        : null}
      {list ? (
        <>
          <h4 className={styles.article__listHeading}>{list.listHeading}</h4>
          <ul className={styles.article__list}>
            {list.items.map((item) => (
              <li key={item} className={styles.article__listElement}>
                {item}
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </article>
  ));

  return (
    <section className={styles.wrapper}>
      <BreadCrumbs links={linkLabels} className={styles.wrapper__nav} />
      <div className={styles.wrapper__image}>
        <Image src={photo} layout="fill" />
        <h1 className={styles.wrapper__mainTitle}>{title}</h1>
      </div>
      <p className={styles.wrapper__author}>
        Autor: <span>{author}</span>
      </p>
      <p className={styles.wrapper__date}>
        Opublikowano: <span>{date}</span>
      </p>
      <h2 className={styles.wrapper__title}>{title}</h2>
      {blogContent}
    </section>
  );
};

export default BlogItem;

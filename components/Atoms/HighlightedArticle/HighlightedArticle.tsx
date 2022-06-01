import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { IBlog } from 'interfaces';
import NavLink from '../NavLink/NavLink';
import styles from './HighlightedArticle.module.scss';

type Props = { blog: IBlog };

const articleVariant = { hidden: { opacity: 0, x: -200 }, visible: { opacity: 1, x: 0, transition: { delay: 1.8, duration: 0.5 } } };

const HighlightedArticle = ({ blog: { title, photo, author, date, id, summary } }: Props) => {
  return (
    <motion.article className={styles.highlighted} variants={articleVariant} initial="hidden" animate="visible">
      <div className={styles.highlighted__image}>
        <Image src={photo} layout="fill" />
      </div>
      <div className={styles.highlighted__content}>
        <h3 className={styles.highlighted__title}>{title}</h3>
        <p className={styles.highlighted__author}>
          Autor: <span>{author}</span>
        </p>
        <p className={styles.highlighted__date}>
          Opublikowano: <span>{date}</span>
        </p>
        <p className={styles.highlighted__description}>
          {summary.slice(0, 300)}...
          <NavLink label="czytaj dalej" href={`/blog/${id}`} className={styles.highlighted__link} />
        </p>
      </div>
    </motion.article>
  );
};

export default HighlightedArticle;

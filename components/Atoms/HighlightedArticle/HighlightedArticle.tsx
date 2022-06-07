import React, { useEffect } from 'react';
import Image from 'next/image';
import { useAnimation, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { IBlogPost } from 'interfaces';
import NavLink from '../NavLink/NavLink';
import styles from './HighlightedArticle.module.scss';

type Props = { blogPost: IBlogPost };

const articleVariant = { hidden: { opacity: 0, x: -200 }, visible: { opacity: 1, x: 0, transition: { delay: 0.3, duration: 0.5 } } };

const HighlightedArticle = ({ blogPost: { title, photo, author, date, id, summary } }: Props) => {
  const [ref, inView] = useInView({ threshold: 0.3 });

  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);

  return (
    <motion.article className={styles.highlighted} variants={articleVariant} initial="hidden" animate={controls} ref={ref}>
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

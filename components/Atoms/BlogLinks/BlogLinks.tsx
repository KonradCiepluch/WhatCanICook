import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { IBlogPost } from 'interfaces';
import styles from './BlogLinks.module.scss';

const sectionVariant = { hidden: { opacity: 0, x: 200 }, visible: { opacity: 1, x: 0, transition: { delay: 0.7, duration: 0.5 } } };

type Props = { blogPosts: IBlogPost[] };

const BlogLinks = ({ blogPosts }: Props) => {
  const [ref, inView] = useInView({ threshold: 0.3 });

  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);

  const links = blogPosts.map(({ id, photo, title }) => (
    <Link key={id} href={`/blog/${id}`}>
      <a className={styles.blogs__link}>
        <Image src={photo} width={80} height={80} />
        {title}
      </a>
    </Link>
  ));

  return (
    <motion.section className={styles.blogs} ref={ref} variants={sectionVariant} animate={controls} initial="hidden">
      <h4 className={styles.blogs__title}>Sprawdź artykuły na naszym blogu:</h4>
      <nav className={styles.blogs__nav}>{links}</nav>
    </motion.section>
  );
};

export default BlogLinks;

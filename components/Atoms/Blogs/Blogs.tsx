import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { IBlog } from 'interfaces';
import styles from './Blogs.module.scss';

type Props = { blogs: IBlog[] };

const Blogs = ({ blogs }: Props) => {
  const links = blogs.map(({ id, photo, title }) => (
    <Link key={id} href={`/blog/${id}`}>
      <a className={styles.blogs__link}>
        <Image src={photo} width={80} height={80} />
        {title}
      </a>
    </Link>
  ));

  return (
    <section className={styles.blogs}>
      <h4 className={styles.blogs__title}>Sprawdź artykuły na naszym blogu:</h4>
      <nav className={styles.blogs__nav}>{links}</nav>
    </section>
  );
};

export default Blogs;

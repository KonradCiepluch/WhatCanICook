import React from 'react';

import { BreadCrumbs } from 'components/Molecules';
import { BlogArticle } from 'components/Atoms';
import { IBlog } from 'interfaces';
import styles from './Blog.module.scss';

type Props = { blogs: IBlog[] };

const linkLabels = [
  { label: 'What can I cook', href: '/' },
  { label: 'Blog', href: `/blog` },
];

const Blog = ({ blogs }: Props) => {
  const articles = blogs.map((blog) => <BlogArticle key={blog.id} blog={blog} />);

  return (
    <section className={styles.blog}>
      <BreadCrumbs links={linkLabels} className={styles.blog__nav} />
      {articles}
    </section>
  );
};

export default Blog;

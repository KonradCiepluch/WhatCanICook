import React from 'react';

import { BreadCrumbs } from 'components/Molecules';
import { BlogArticle } from 'components/Atoms';
import { IBlogPost } from 'interfaces';
import styles from './Blog.module.scss';

type Props = { blogPosts: IBlogPost[] };

const linkLabels = [
  { label: 'What can I cook', href: '/' },
  { label: 'Blog', href: `/blog` },
];

const Blog = ({ blogPosts }: Props) => {
  const articles = blogPosts.map((blog) => <BlogArticle key={blog.id} blogPost={blog} />);

  return (
    <section className={styles.blog}>
      <BreadCrumbs links={linkLabels} className={styles.blog__nav} />
      {articles}
    </section>
  );
};

export default Blog;

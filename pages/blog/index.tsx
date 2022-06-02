import React from 'react';
import { GetStaticProps } from 'next';

import { Blog } from 'components/Templates';
import { getBlogPosts } from 'lib/firebaseData';
import { IBlogPost } from 'interfaces';

type Props = { blogPosts: IBlogPost[] };

const BlogPage = ({ blogPosts }: Props) => {
  return <Blog blogPosts={blogPosts} />;
};

export default BlogPage;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const blogPosts = await getBlogPosts();
    return { props: { blogPosts } };
  } catch (e) {
    return { props: { blogPosts: [] as IBlogPost[] } };
  }
};

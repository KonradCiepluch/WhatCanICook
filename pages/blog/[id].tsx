import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';

import { BlogItem } from 'components/Templates';
import { getBlogPosts } from 'lib/firebaseData';
import { IBlogPost } from 'interfaces';

type Props = { blogPost: IBlogPost };

const BlogItemPage = ({ blogPost }: Props) => {
  return <BlogItem blogPost={blogPost} />;
};

export default BlogItemPage;

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const blogPosts = await getBlogPosts();

    const paths = blogPosts.map(({ id }) => ({ params: { id } }));

    return { paths, fallback: false };
  } catch (e) {
    return { paths: [], fallback: false };
  }
};

export const getStaticProps: GetStaticProps = async ({ params: { id } }) => {
  const blogId = Array.isArray(id) ? id[0] : id;
  try {
    const blogPosts = await getBlogPosts();

    const blogPost = blogPosts.find((item) => item.id === blogId);

    return { props: { blogPost } };
  } catch (e) {
    return { props: { blogPost: null } };
  }
};

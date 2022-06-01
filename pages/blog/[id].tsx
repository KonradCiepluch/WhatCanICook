import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';

import { BlogItem } from 'components/Templates';
import { getBlogs } from 'lib/firebaseData';
import { IBlog } from 'interfaces';

type Props = { blog: IBlog };

const BlogItemPage = ({ blog }: Props) => {
  return <BlogItem blog={blog} />;
};

export default BlogItemPage;

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const blogs = await getBlogs();

    const paths = blogs.map(({ id }) => ({ params: { id } }));

    return { paths, fallback: false };
  } catch (e) {
    return { paths: [], fallback: false };
  }
};

export const getStaticProps: GetStaticProps = async ({ params: { id } }) => {
  const blogId = Array.isArray(id) ? id[0] : id;
  try {
    const blogs = await getBlogs();

    const blog = blogs.find((item) => item.id === blogId);

    return { props: { blog } };
  } catch (e) {
    return { props: { blog: null } };
  }
};

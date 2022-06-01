import React from 'react';
import { GetStaticProps } from 'next';

import { Blog } from 'components/Templates';
import { getBlogs } from 'lib/firebaseData';
import { IBlog } from 'interfaces';

type Props = { blogs: IBlog[] };

const BlogPage = ({ blogs }: Props) => {
  return <Blog blogs={blogs} />;
};

export default BlogPage;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const blogs = await getBlogs();
    return { props: { blogs } };
  } catch (e) {
    return { props: { blogs: [] as IBlog[] } };
  }
};

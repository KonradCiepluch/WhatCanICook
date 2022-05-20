import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { Category } from 'components/Templates';
import { getCategories } from 'lib/firebaseData';
import { ICategory } from 'interfaces';

type Props = { category: ICategory };

const CategoryPage = ({ category }: Props) => {
  return <Category category={category} />;
};

export default CategoryPage;

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const categories = await getCategories();

    const paths = categories.map(({ slug }) => ({ params: { category: slug } }));

    return {
      paths,
      fallback: false,
    };
  } catch (e) {
    console.error(e);
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params: { category } }) => {
  const recipesCategory = Array.isArray(category) ? category[0] : category;
  try {
    const categories = await getCategories();

    const foundCategory = categories.find(({ slug }) => slug === recipesCategory);

    return { props: { category: foundCategory } };
  } catch (e) {
    console.error(e);
    return { props: { category: '' } };
  }
};

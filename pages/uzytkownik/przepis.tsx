import React from 'react';
import { GetStaticProps } from 'next';

import { getCategories } from 'lib/firebaseData';
import { ICategory } from 'interfaces/Menu';
import { AddRecipe } from 'components/Templates';

type Props = { categories: ICategory[] };

const Recipe = ({ categories }: Props) => {
  return <AddRecipe categories={categories} />;
};

export default Recipe;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const categories = await getCategories();

    return { props: { categories } };
  } catch (e) {
    console.error(e);
    return { props: { categories: [] as ICategory[] } };
  }
};

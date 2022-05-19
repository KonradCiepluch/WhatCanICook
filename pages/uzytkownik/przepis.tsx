import React from 'react';
import { GetStaticProps } from 'next';

import { getCategories, getTags } from 'lib/firebaseData';
import { ICategory } from 'interfaces';
import { AddRecipe } from 'components/Templates';
import DetailsProvider from 'context/DetailsProvider/DetailsProvider';

type Props = { categories: ICategory[]; tags: string[] };

const Recipe = ({ categories, tags }: Props) => {
  return (
    <DetailsProvider>
      <AddRecipe categories={categories} tags={tags} />
    </DetailsProvider>
  );
};

export default Recipe;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const categories = await getCategories();
    const tags = await getTags();

    return { props: { categories, tags } };
  } catch (e) {
    console.error(e);
    return { props: { categories: [] as ICategory[], tags: [] as string[] } };
  }
};

import React from 'react';

import { getRecipes, getCategories, getBlogs } from 'lib/firebaseData';
import { Home } from 'components/Templates';
import { IRecipe, ICategory, IBlog } from 'interfaces';

type Props = { recipes: IRecipe[]; categories: ICategory[]; blogs: IBlog[] };

const HomePage = ({ recipes, categories, blogs }: Props) => {
  return <Home recipe={recipes[0]} categories={categories} blogs={blogs} />;
};

export default HomePage;

export const getStaticProps = async () => {
  try {
    const [recipes, categories, blogs] = await Promise.all([getRecipes(), getCategories(), getBlogs()]);

    return { props: { recipes, categories, blogs } };
  } catch (e) {
    return { props: { recipes: [], categories: [], blogs: [] } };
  }
};

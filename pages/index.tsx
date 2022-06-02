import React from 'react';

import { getRecipes, getCategories, getBlogPosts } from 'lib/firebaseData';
import { Home } from 'components/Templates';
import { IRecipe, ICategory, IBlogPost } from 'interfaces';

type Props = { recipes: IRecipe[]; categories: ICategory[]; blogPosts: IBlogPost[] };

const HomePage = ({ recipes, categories, blogPosts }: Props) => {
  return <Home recipe={recipes[0]} categories={categories} blogPosts={blogPosts} />;
};

export default HomePage;

export const getStaticProps = async () => {
  try {
    const [recipes, categories, blogPosts] = await Promise.all([getRecipes(), getCategories(), getBlogPosts()]);

    return { props: { recipes, categories, blogPosts } };
  } catch (e) {
    return { props: { recipes: [], categories: [], blogPosts: [] } };
  }
};

import React from 'react';

import { IRecipe, ICategory, IBlog } from 'interfaces';
import { HighlightedArticle, Blogs } from 'components/Atoms';
import Hero from './Hero/Hero';
import Carousel from './Carousel/Carousel';
import Newsletter from './Newsletter/Newsletter';

type Props = { recipe: IRecipe; categories: ICategory[]; blogs: IBlog[] };

const Home = ({ recipe, categories, blogs }: Props) => {
  const blog = blogs.find(({ isHighlighted }) => isHighlighted);

  const restBlogs = blogs.filter(({ isHighlighted }) => !isHighlighted);

  return (
    <>
      <Hero recipe={recipe} />
      <Carousel categories={categories} />
      <HighlightedArticle blog={blog} />
      <Blogs blogs={restBlogs} />
      <Newsletter />
    </>
  );
};

export default Home;

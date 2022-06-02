import React from 'react';

import { IRecipe, ICategory, IBlogPost } from 'interfaces';
import { HighlightedArticle, BlogLinks } from 'components/Atoms';
import Hero from './Hero/Hero';
import Carousel from './Carousel/Carousel';
import Newsletter from './Newsletter/Newsletter';

type Props = { recipe: IRecipe; categories: ICategory[]; blogPosts: IBlogPost[] };

const Home = ({ recipe, categories, blogPosts }: Props) => {
  const blogPost = blogPosts.find(({ isHighlighted }) => isHighlighted);

  const restBlogPosts = blogPosts.filter(({ isHighlighted }) => !isHighlighted);

  return (
    <>
      <Hero recipe={recipe} />
      <Carousel categories={categories} />
      <HighlightedArticle blogPost={blogPost} />
      <BlogLinks blogPosts={restBlogPosts} />
      <Newsletter />
    </>
  );
};

export default Home;

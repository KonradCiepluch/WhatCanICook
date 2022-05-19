import React from 'react';
import { GetServerSideProps } from 'next';

import RecipeTemplate from 'components/Templates/Recipes/RecipeTemplate/RecipeTemplate';
import { getRecipes } from 'lib/firebaseData';
import { IRecipe } from 'interfaces';

type Props = { recipe: IRecipe };

const RecipePage = ({ recipe }: Props) => {
  return <RecipeTemplate recipe={recipe} />;
};

export default RecipePage;

export const getServerSideProps: GetServerSideProps = async ({ params: { recipe } }) => {
  const recipeName = Array.isArray(recipe) ? recipe[0] : recipe;

  try {
    const recipes = await getRecipes();

    const foundRecipe = recipes.find(({ slug }) => slug === recipeName);

    return { props: { recipe: foundRecipe } };
  } catch (e) {
    console.error(e);

    return { props: { recipe: null } };
  }
};

import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { getRecipes, getCategories } from 'lib/firebaseData';
import { IRecipe } from 'interfaces/Recipe';
import Subcategory from 'components/Templates/Recipes/Subcategory/Subcategory';

type Props = { subcategory: string; recipes: IRecipe[] };

const SubcategoryPage = ({ subcategory, recipes }: Props) => {
  return <Subcategory subcategory={subcategory} recipes={recipes} />;
};

export default SubcategoryPage;

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const categories = await getCategories();

    const paths = categories.reduce((prev, { name, subcategories }) => {
      const subcategory = subcategories.map((item) => ({ params: { category: name, subcategory: item.name } }));
      return [...prev, ...subcategory];
    }, [] as { params: { category: string; subcategory: string } }[]);

    return { paths, fallback: false };
  } catch (e) {
    console.error(e);
    return { paths: [], fallback: false };
  }
};

export const getStaticProps: GetStaticProps = async ({ params: { category, subcategory } }) => {
  const recipesCategory = Array.isArray(category) ? category[0] : category;
  const recipesSubcategory = Array.isArray(subcategory) ? subcategory[0] : subcategory;

  try {
    const recipes = await getRecipes();

    const recipesBySubcategory = recipes.filter(
      ({ category: { name, subcategory: subCat } }) =>
        recipesCategory.toLowerCase() === name.toLowerCase() && recipesSubcategory.toLowerCase() === subCat.toLowerCase()
    );

    return { props: { subcategory: recipesSubcategory, recipes: recipesBySubcategory } };
  } catch (e) {
    console.error(e);
    return { props: { subcategory: recipesSubcategory, recipes: [] } };
  }
};

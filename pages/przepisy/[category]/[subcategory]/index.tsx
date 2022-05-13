import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { getRecipes, getCategories } from 'lib/firebaseData';
import { IRecipe } from 'interfaces/Recipe';
import Subcategory from 'components/Templates/Recipes/Subcategory/Subcategory';

type Props = { category: string; subcategory: string; categorySlug: string; subcategorySlug: string; recipes: IRecipe[] };

const SubcategoryPage = ({ category, subcategory, categorySlug, subcategorySlug, recipes }: Props) => {
  return (
    <Subcategory category={category} subcategory={subcategory} recipes={recipes} categorySlug={categorySlug} subcategorySlug={subcategorySlug} />
  );
};

export default SubcategoryPage;

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const categories = await getCategories();

    const paths = categories.reduce((prev, { slug, subcategories }) => {
      const subcategory = subcategories.map((item) => ({ params: { category: slug, subcategory: item.slug } }));
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
    const categories = await getCategories();

    const recipes = await getRecipes();

    const { name: categoryName, subcategories } = categories.find(({ slug }) => slug === recipesCategory);

    const { name: subCategoryName } = subcategories.find(({ slug }) => slug === recipesSubcategory);

    const recipesBySubcategory = recipes.filter(
      ({ category: { categorySlug, subcategorySlug } }) => recipesCategory === categorySlug && recipesSubcategory === subcategorySlug
    );

    return {
      props: {
        category: categoryName,
        categorySlug: recipesCategory,
        subcategory: subCategoryName,
        subcategorySlug: recipesSubcategory,
        recipes: recipesBySubcategory,
      },
    };
  } catch (e) {
    console.error(e);
    return { props: { subcategory: recipesSubcategory, recipes: [] } };
  }
};

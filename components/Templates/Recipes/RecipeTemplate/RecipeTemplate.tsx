import React, { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { IRecipe } from 'interfaces/Recipe';
import { TimeWidget, LevelWidget, Ingredient, Step, RecipeArticle } from 'components/Atoms';
import styles from './RecipeTemplate.module.scss';

type Props = { recipe: IRecipe };

const RecipeTemplate = ({
  recipe: {
    name,
    photo,
    difficultyLevel,
    time,
    tags: tagLabels,
    shoppingList,
    steps,
    category: { name: category, subcategory },
  },
}: Props) => {
  const linkLabels = useMemo(
    () => [
      { label: 'What can I cook', href: '/' },
      { label: category, href: `/przepisy/${category}` },
      { label: subcategory, href: `/przepisy/${category}/${subcategory}` },
      { label: name, href: `/przepisy/${category}/${subcategory}/${name}` },
    ],
    [category, subcategory, name]
  );

  const links = linkLabels.map(({ label, href }) => (
    <Link key={label} href={href}>
      <a className={styles.wrapper__link}>{label}</a>
    </Link>
  ));

  const tags = tagLabels.map((tag) => (
    <span key={tag} className={styles.wrapper__tag}>
      {tag}
    </span>
  ));

  const recipeSteps = steps.map((step, index) => <Step key={step.description} index={index + 1} {...step} />);

  const ingredients = shoppingList.map(({ product }) => <Ingredient key={product.name} {...product} />);

  const pageContent = useMemo(
    () => [
      {
        className: styles.wrapper__description,
        mainTitle: name,
        content: (
          <div className={styles.wrapper__details}>
            <LevelWidget level={difficultyLevel} />
            <TimeWidget time={time} />
          </div>
        ),
      },
      {
        className: styles.wrapper__image,
        content: <Image src={photo} alt="dish image" layout="fill" />,
      },
      {
        className: styles.wrapper__ingredients,
        title: 'Składniki',
        content: <ul>{ingredients}</ul>,
      },
      {
        className: styles.wrapper__steps,
        title: 'Przygotowanie krok po kroku',
        content: <ul>{recipeSteps}</ul>,
      },
      {
        className: styles.wrapper__tags,
        title: 'Przygotowanie krok po kroku',
        content: (
          <>
            <span>Tagi:</span>
            {tags}
          </>
        ),
      },
    ],
    [difficultyLevel, ingredients, name, photo, recipeSteps, tags, time]
  );

  const articles = pageContent.map(({ content, ...props }) => (
    <RecipeArticle key={props.className} {...props}>
      {content}
    </RecipeArticle>
  ));

  return (
    <section className={styles.wrapper}>
      <header className={styles.wrapper__header}>{links}</header>
      {articles}
    </section>
  );
};

export default RecipeTemplate;

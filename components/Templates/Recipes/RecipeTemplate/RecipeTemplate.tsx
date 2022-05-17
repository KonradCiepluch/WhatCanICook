import React, { useMemo } from 'react';
import Image from 'next/image';

import { IRecipe } from 'interfaces/Recipe';
import { TimeWidget, LevelWidget, Ingredient, Step, RecipeArticle, Button } from 'components/Atoms';
import { BreadCrumbs } from 'components/Molecules';
import { useUser } from 'context/UserProvider';
import styles from './RecipeTemplate.module.scss';

type Props = { recipe: IRecipe };

const RecipeTemplate = ({
  recipe: {
    name,
    photo,
    difficultyLevel,
    time,
    slug: nameSlug,
    tags: tagLabels,
    shoppingList,
    steps,
    category: { name: category, subcategory, categorySlug, subcategorySlug },
    author,
  },
}: Props) => {
  const { authenticatedUser } = useUser();

  const linkLabels = useMemo(() => {
    return [
      { label: 'What can I cook', href: '/' },
      { label: category, href: `/przepisy/${categorySlug}` },
      { label: subcategory, href: `/przepisy/${categorySlug}/${subcategorySlug}` },
      { label: name, href: `/przepisy/${categorySlug}/${subcategorySlug}/${nameSlug}` },
    ];
  }, [category, subcategory, name, nameSlug, categorySlug, subcategorySlug]);

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
          <>
            {author ? <p className={styles.wrapper__author}>Autor: {author.name}</p> : null}
            <div className={styles.wrapper__details}>
              <LevelWidget level={difficultyLevel} />
              <TimeWidget time={time} />
            </div>
          </>
        ),
      },
      {
        className: styles.wrapper__image,
        content: <Image src={photo} alt="dish image" layout="fill" />,
      },
      {
        className: styles.wrapper__ingredients,
        title: 'Składniki',
        content: (
          <>
            <ul>{ingredients}</ul>
            {authenticatedUser ? <Button label="Dodaj do listy zakupów" className={styles.wrapper__button} /> : null}
          </>
        ),
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
    [difficultyLevel, ingredients, name, photo, recipeSteps, tags, time, author, authenticatedUser]
  );

  const articles = pageContent.map(({ content, ...props }) => (
    <RecipeArticle key={props.className} {...props}>
      {content}
    </RecipeArticle>
  ));

  return (
    <section className={styles.wrapper}>
      <BreadCrumbs links={linkLabels} className={styles.wrapper__header} />
      {articles}
    </section>
  );
};

export default RecipeTemplate;

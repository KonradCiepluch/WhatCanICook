import React from 'react';

type Props = { className?: string; mainTitle?: string; title?: string; children: React.ReactNode };

const RecipeArticle = ({ mainTitle, title, children, className = '' }: Props) => {
  return (
    <article className={className}>
      {mainTitle ? <h1>{mainTitle}</h1> : null}
      {title ? <h2>{title}</h2> : null}
      {children}
    </article>
  );
};

export default RecipeArticle;

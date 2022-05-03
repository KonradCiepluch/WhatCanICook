import React from 'react';

import styles from './Ingredient.module.scss';

type Props = { name: string; amount: string };

const Ingredient = ({ name, amount }: Props) => {
  return (
    <li className={styles.product}>
      <span className={styles.product__name}>{name} </span>
      <span className={styles.product__dots} />
      <span className={styles.product__amount}>{amount}</span>
    </li>
  );
};

export default Ingredient;

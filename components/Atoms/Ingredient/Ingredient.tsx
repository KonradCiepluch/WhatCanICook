import React from 'react';

import styles from './Ingredient.module.scss';

type Props = { name: string; amount: string; unit: string };

const Ingredient = ({ name, amount, unit }: Props) => {
  return (
    <li className={styles.product}>
      <span className={styles.product__name}>{name} </span>
      <span className={styles.product__dots} />
      <span className={styles.product__amount}>
        {amount} {unit}
      </span>
    </li>
  );
};

export default Ingredient;

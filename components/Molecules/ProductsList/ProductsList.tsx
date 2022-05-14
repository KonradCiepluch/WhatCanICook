import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useFormContext } from 'react-hook-form';

import { useDetailsContext } from 'context/DetailsProvider';
import { Button, ListElement } from 'components/Atoms';
import styles from './ProductsList.module.scss';

const units = ['gram', 'kg', 'szt', 'ml', 'l'];

const ProductsList = ({ isSuccess }: { isSuccess: boolean }) => {
  const {
    state: { product, products, errors },
    handlers: { handleAddProduct, handleChangeField, handleRemoveProduct, handleReset },
  } = useDetailsContext();

  const {
    formState: { errors: formErrors },
    register,
    setValue,
    clearErrors,
  } = useFormContext();

  useEffect(() => {
    setValue('products', products.length);
    if (products.length >= 2) clearErrors('products');
  }, [setValue, clearErrors, products.length]);

  useEffect(() => {
    if (isSuccess) handleReset();
  }, [isSuccess, handleReset]);

  const options = units.map((unit) => <option key={unit}>{unit}</option>);

  const items = products.map(({ id, name, amount, unit }) => (
    <ListElement key={id} id={id} handleRemove={handleRemoveProduct}>
      <span className={styles.products__name}>{name}</span>
      <span className={styles.products__amount}>{`${amount} ${unit}`}</span>
    </ListElement>
  ));

  const warnings = errors.products.map((error) => (
    <span key={error} className={styles.products__error}>
      {error}
    </span>
  ));

  return (
    <section className={styles.products}>
      <input type="text" {...register('products')} className={styles.products__hidden} />
      <h2 className={styles.products__heading}>Dodaj produkt do listy zakupów</h2>
      <div className={styles.products__add}>
        <input
          type="text"
          name="name"
          placeholder="Nazwa produktu"
          value={product.name}
          onChange={handleChangeField}
          className={styles.products__input}
        />
        <input type="text" name="amount" placeholder="Ilość" value={product.amount} onChange={handleChangeField} className={styles.products__input} />
        <select name="unit" value={product.unit} onChange={handleChangeField} className={styles.products__select}>
          {options}
        </select>
        <Button type="button" label="Dodaj" className={styles.products__button} handleClick={handleAddProduct} />
      </div>
      {errors.products.length ? warnings : null}
      <ul className={styles.products__list}>
        <AnimatePresence>{items}</AnimatePresence>
      </ul>
      {formErrors.products ? <span className={styles.products__error}>{formErrors.products.message}</span> : null}
    </section>
  );
};

export default ProductsList;

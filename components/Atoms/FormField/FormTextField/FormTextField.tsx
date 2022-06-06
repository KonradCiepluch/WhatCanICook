import React from 'react';
import { useFormContext } from 'react-hook-form';

import { IField } from 'interfaces';
import styles from '../FormField.module.scss';

const FormTextField = ({ name, type, placeholder, disabled }: IField) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles.field}>
      <input type={type} placeholder={placeholder} {...register(name)} className={styles.field__input} disabled={disabled} data-cy={name} />
      {errors[name] ? <span className={styles.field__error}>{errors[name].message}</span> : null}
    </div>
  );
};

export default FormTextField;

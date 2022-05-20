import React from 'react';
import { useFormContext } from 'react-hook-form';

import { IField } from 'interfaces';
import styles from '../FormField.module.scss';

const FormFileField = ({ name, disabled, placeholder, label }: IField) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles.field}>
      <label>{label}</label>
      <input type="file" placeholder={placeholder} {...register(name)} className={styles.field__input} disabled={disabled} />
      {errors[name] ? <span className={styles.field__error}>{errors[name].message}</span> : null}
    </div>
  );
};

export default FormFileField;

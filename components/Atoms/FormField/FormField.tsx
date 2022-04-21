import React from 'react';
import Link from 'next/link';
import { useFormContext } from 'react-hook-form';

import styles from 'components/Organisms/PageForm/PageForm.module.scss';
import IField from 'interfaces/Form';

interface IProps extends IField {}

const FormField = ({ name, id, type = 'text', placeholder, label }: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  if (name !== 'remember')
    return (
      <div className={styles.form__field}>
        <input type={type} placeholder={placeholder} {...register(name)} className={styles.form__input} />
        {errors[name] ? <span className={styles.form__error}>{errors[name].message}</span> : null}
      </div>
    );

  return (
    <div className={styles.form__remember}>
      <input type={type} id={id} {...register(name)} />
      <label htmlFor={id}>{label}</label>
      <Link href="/odzyskiwanie-hasla">
        <a>Nie pamiętam hasła</a>
      </Link>
    </div>
  );
};

export default FormField;

import React from 'react';
import Link from 'next/link';
import { useFormContext } from 'react-hook-form';

import { IField } from 'interfaces';
import styles from '../FormField.module.scss';

const FormCheckboxField = ({ name, id, label }: IField) => {
  const { register } = useFormContext();

  return (
    <div className={styles.field__remember}>
      <input type="checkbox" id={id} {...register(name)} />
      <label htmlFor={id}>{label}</label>
      <Link href="/odzyskiwanie-hasla">
        <a>Nie pamiętam hasła</a>
      </Link>
    </div>
  );
};

export default FormCheckboxField;

import React from 'react';
import Link from 'next/link';
import { useFormContext } from 'react-hook-form';

import IField from 'interfaces/Form';
import styles from './FormField.module.scss';

interface IProps extends IField {
  options?: string[];
  hiddenOption?: string;
  changeHandler?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FormField = ({ name, id, type = 'text', placeholder, label, hiddenOption = '', disabled, options, changeHandler }: IProps) => {
  const {
    register,
    formState: { errors },
    clearErrors,
  } = useFormContext();

  if (type === 'select')
    return (
      <div className={styles.field}>
        <label>{label}</label>
        <select {...register(name)} onChange={changeHandler} disabled={disabled}>
          <option hidden value="">
            {hiddenOption}
          </option>
          {options.map((el) => (
            <option key={el} onClick={() => clearErrors(name)}>
              {el}
            </option>
          ))}
        </select>
        {errors[name] ? <span className={styles.field__error}>{errors[name].message}</span> : null}
      </div>
    );

  if (name === 'remember')
    return (
      <div className={styles.field__remember}>
        <input type={type} id={id} {...register(name)} />
        <label htmlFor={id}>{label}</label>
        <Link href="/odzyskiwanie-hasla">
          <a>Nie pamiętam hasła</a>
        </Link>
      </div>
    );

  return (
    <div className={styles.field}>
      {type === 'file' ? <label>{label}</label> : null}
      <input type={type} placeholder={placeholder} {...register(name)} className={styles.field__input} disabled={disabled} />
      {errors[name] ? <span className={styles.field__error}>{errors[name].message}</span> : null}
    </div>
  );
};

export default FormField;

import React from 'react';
import { useFormContext } from 'react-hook-form';

import IField from 'interfaces/Form';
import styles from '../FormField.module.scss';

export interface ISelectProps extends IField {
  options?: string[];
  hiddenOption?: string;
  changeHandler?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FormSelectField = ({ name, label, hiddenOption = '', disabled, options, changeHandler }: ISelectProps) => {
  const {
    register,
    formState: { errors },
    clearErrors,
  } = useFormContext();

  const selectOptions = options.map((el) => (
    <option key={el} onClick={() => clearErrors(name)}>
      {el}
    </option>
  ));

  return (
    <div className={`${styles.field}  ${styles.field__select}`}>
      <label>{label}</label>
      <select {...register(name)} onChange={changeHandler} disabled={disabled}>
        <option hidden value="">
          {hiddenOption}
        </option>
        {selectOptions}
      </select>
      {errors[name] ? <span className={styles.field__error}>{errors[name].message}</span> : null}
    </div>
  );
};

export default FormSelectField;

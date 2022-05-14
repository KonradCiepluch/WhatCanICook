import React, { useMemo, useEffect, useRef } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useFormContext } from 'react-hook-form';

import { useDetailsContext } from 'context/DetailsProvider/DetailsProvider';
import styles from './SelectTag.module.scss';

const animatedComponents = makeAnimated();

const selectStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: '0',
  }),
};

type Props = { tags: string[]; isSuccess: boolean };

const SelectTag = ({ tags, isSuccess }: Props) => {
  const {
    state: { tags: tagList },
    handlers: { handleChangeTags },
  } = useDetailsContext();

  const selectRef = useRef(null);

  const {
    formState: { errors },
    register,
    setValue,
    clearErrors,
  } = useFormContext();

  useEffect(() => {
    setValue('tags', tagList.length);
    if (tagList.length >= 2) clearErrors('tags');
  }, [setValue, clearErrors, tagList.length]);

  const handleChange = (values: typeof options) => {
    const selectedTags = values.map(({ value }) => value);
    handleChangeTags(selectedTags);
  };

  useEffect(() => {
    if (isSuccess && selectRef.current) {
      selectRef.current.clearValue();
    }
  }, [isSuccess]);

  const options = useMemo(() => tags.map((tag) => ({ value: tag, label: tag })), [tags]);

  return (
    <section className={styles.select}>
      <input type="text" {...register('tags')} className={styles.select__hidden} />
      <Select
        ref={selectRef}
        instanceId="select-tag"
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={options}
        placeholder="Wybierz tagi z listy"
        onChange={handleChange}
        styles={selectStyles}
      />
      {errors.tags ? <span className={styles.select__error}>{errors.tags.message}</span> : null}
    </section>
  );
};

export default SelectTag;

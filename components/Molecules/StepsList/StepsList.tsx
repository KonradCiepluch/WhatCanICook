import React, { useEffect, useRef, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useFormContext } from 'react-hook-form';

import { useDetailsContext } from 'context/DetailsProvider/DetailsProvider';
import { Button, ListElement } from 'components/Atoms';
import styles from './StepsList.module.scss';

const StepsList = () => {
  const {
    state: { step, steps, errors },
    handlers: { handleChangeField, handleChangeFile, handleAddStep, handleRemoveStep },
  } = useDetailsContext();

  const {
    formState: { errors: formErrors },
    register,
    setValue,
    clearErrors,
  } = useFormContext();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setValue('steps', steps.length);
    if (steps.length >= 2) clearErrors('steps');
  }, [setValue, clearErrors, steps.length]);

  const handleChange = ({ target: { files } }: React.ChangeEvent<HTMLInputElement>) => {
    const photo = files[0];
    handleChangeFile(photo);
  };

  const handleClearFile = useCallback(() => {
    if (!fileInputRef.current) return;
    handleChangeFile();
    fileInputRef.current.value = '';
  }, [handleChangeFile]);

  const items = steps.map(({ id, description }) => (
    <ListElement key={id} id={id} handleRemove={handleRemoveStep}>
      <p className={styles.steps__description}>{description}</p>
    </ListElement>
  ));

  const warnings = errors.steps.map((error) => (
    <span key={error} className={styles.steps__error}>
      {error}
    </span>
  ));

  return (
    <section className={styles.steps}>
      <input type="text" {...register('steps')} className={styles.steps__hidden} />
      <h2 className={styles.steps__heading}>Dodaj poszczególne kroki przygotowania dania</h2>
      <div className={styles.steps__add}>
        <textarea name="description" placeholder="Opis" className={styles.steps__area} onChange={handleChangeField} value={step.description} />
        <label className={styles.steps__label}>Możesz dodać do opisu zdjęcie lub link do video na YouTube</label>
        <div className={styles.steps__file}>
          <input type="file" name="photo" className={styles.steps__input} onChange={handleChange} ref={fileInputRef} />
          <Button type="button" label="Usuń zdjęcie" className={styles.steps__remove} handleClick={handleClearFile} />
        </div>
        <input
          type="text"
          name="url"
          placeholder="Tutaj możesz wkleić link do video na YouTube"
          className={styles.steps__input}
          onChange={handleChangeField}
          value={step.url}
        />
        <Button type="button" label="Dodaj" className={styles.steps__button} handleClick={handleAddStep} />
      </div>
      {errors.steps.length ? warnings : null}
      <ul>
        <AnimatePresence>{items}</AnimatePresence>
      </ul>
      {formErrors.steps ? <span className={styles.steps__error}>{formErrors.steps.message}</span> : null}
    </section>
  );
};

export default StepsList;

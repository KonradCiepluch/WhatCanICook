import React, { useCallback } from 'react';
import { FieldValues } from 'react-hook-form';
import * as yup from 'yup';

import { PageForm } from 'components/Organisms';
import addMemberToGroup from 'lib/addMemberToGroup';
import styles from './Newsletter.module.scss';

const content = {
  heading: 'Zapisz się do newslettera i otrzymuj ciekawe przepisy',
  submitLabel: 'Wyślij',
  successMessage: 'Email został zapisany do naszej bazy. Dziękujemy!',
};

const schema = yup.object().shape({
  email: yup.string().email('Niepoprawny adres email').required('Adres email jest wymagany'),
});

const inputsArray = [
  {
    type: 'text',
    placeholder: 'wpisz adres email',
    name: 'email',
  },
];

const Newsletter = () => {
  const handleSubmit = useCallback(async ({ email }: FieldValues) => {
    await addMemberToGroup(email);
  }, []);

  return (
    <section className={styles.newsletter}>
      <div className={styles.newsletter__wrapper}>
        <PageForm content={content} submitHandler={handleSubmit} inputsArray={inputsArray} schema={schema} />
      </div>
    </section>
  );
};

export default Newsletter;

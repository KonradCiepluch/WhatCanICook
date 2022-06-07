import React, { useEffect, useCallback } from 'react';
import { FieldValues } from 'react-hook-form';
import * as yup from 'yup';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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
const sectionVariant = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { delay: 0.5, duration: 0.6 } },
};

const Newsletter = () => {
  const [ref, inView] = useInView({ threshold: 0.5 });

  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);

  const handleSubmit = useCallback(async ({ email }: FieldValues) => {
    await addMemberToGroup(email);
  }, []);

  return (
    <motion.section className={styles.newsletter} ref={ref} animate={controls} variants={sectionVariant} initial="hidden">
      <div className={styles.newsletter__wrapper}>
        <PageForm content={content} submitHandler={handleSubmit} inputsArray={inputsArray} schema={schema} />
      </div>
    </motion.section>
  );
};

export default Newsletter;

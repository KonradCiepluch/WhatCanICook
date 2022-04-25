import React, { useEffect, useCallback } from 'react';
import * as yup from 'yup';
import { sendPasswordResetEmail } from 'firebase/auth';
import { FieldValues } from 'react-hook-form';
import { useRouter } from 'next/router';

import { useUser } from 'context/UserProvider';
import { MotionWrapper } from 'components/Atoms';
import { PageForm } from 'components/Organisms';
import { auth } from 'firebaseInit/firebase';

const schema = yup.object().shape({
  email: yup.string().email('Niepoprawny adres email').required('Adres email jest wymagany'),
});

const inputsArray = [{ placeholder: 'wpisz adres email', name: 'email' }];

const content = {
  heading: 'Odzyskiwanie hasła',
  successMessage: 'Email z linkiem resetującym hasło został wysłany, sprawdź skrzynkę.',
  submitLabel: 'Wyślij',
};

const PasswordRestore = () => {
  const { push } = useRouter();

  const { authenticatedUser } = useUser();

  useEffect(() => {
    if (authenticatedUser) push('/uzytkownik');
  }, [authenticatedUser, push]);

  const handleSubmitForm = useCallback(async ({ email }: FieldValues) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (e) {
      throw new Error(e);
    }
  }, []);

  return (
    <MotionWrapper>
      <PageForm content={content} inputsArray={inputsArray} schema={schema} submitHandler={handleSubmitForm} />
    </MotionWrapper>
  );
};

export default PasswordRestore;

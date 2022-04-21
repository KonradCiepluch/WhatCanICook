/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useCallback } from 'react';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FieldValues } from 'react-hook-form';

import { useUser } from 'context/UserProvider';
import { auth } from 'firebaseInit/firebase';
import { PageForm } from 'components/Organisms';

const schema = yup.object().shape({
  firstname: yup.string().min(2, 'Imię powinno mieć przynajmniej 2 znaki').required('Imię jest wymagane'),
  surname: yup.string().min(2, 'Nazwisko powinno mieć przynajmniej 2 znaki').required('Nazwisko jest wymagane'),
  email: yup.string().email('Niepoprawny adres email').required('Adres email jest wymagany'),
  password: yup.string().min(6, 'Hasło powinno mieć przynajmniej 6 znaków').required('Hasło jest wymagane'),
});

const inputsArray = [
  { placeholder: 'wpisz imię', name: 'firstname' },
  { placeholder: 'wpisz nazwisko', name: 'surname' },
  { placeholder: 'wpisz adres email', name: 'email' },
  { type: 'password', placeholder: 'wpisz hasło', name: 'password' },
];

const content = {
  heading: 'Rejestracja',
  successMessage: 'Konto użytkownika zostało utworzone',
  submitLabel: 'Utwórz konto',
};

const Register = () => {
  const { push } = useRouter();

  const { authenticatedUser } = useUser();

  useEffect(() => {
    if (authenticatedUser) push('/uzytkownik');
  }, []);

  const handleSubmitForm = useCallback(async ({ firstname, surname, email, password }: FieldValues) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: `${firstname} ${surname}` });
    } catch (e) {
      throw new Error(e);
    }
  }, []);

  return <PageForm content={content} inputsArray={inputsArray} schema={schema} submitHandler={handleSubmitForm} />;
};

export default Register;

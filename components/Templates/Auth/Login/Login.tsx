import React, { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { signInWithEmailAndPassword, browserLocalPersistence, browserSessionPersistence, setPersistence } from 'firebase/auth';
import { FieldValues } from 'react-hook-form';

import { auth } from 'firebaseInit/firebase';
import { MotionWrapper } from 'components/Atoms';
import { SocialMediaAuth } from 'components/Molecules';
import { PageForm } from 'components/Organisms';
import { useUser } from 'context/UserProvider';

const schema = yup.object().shape({
  email: yup.string().email('Niepoprawny adres email').required('Adres email jest wymagany'),
  password: yup.string().min(6, 'Hasło jest za krótkie').required('Hasło jest wymagane'),
});

const inputsArray = [
  {
    type: 'text',
    placeholder: 'wpisz adres email',
    name: 'email',
  },
  {
    type: 'password',
    placeholder: 'wpisz hasło',
    name: 'password',
  },
  {
    type: 'checkbox',
    name: 'remember',
    id: 'remember',
    label: 'Zapamiętaj mnie',
  },
];

const content = { heading: 'Logowanie', submitLabel: 'Zaloguj się' };

const Login = () => {
  const { push } = useRouter();

  const { handleSignInUser, authenticatedUser } = useUser();

  useEffect(() => {
    if (authenticatedUser) push('/uzytkownik');
  }, [authenticatedUser, push]);

  const handleSubmitForm = useCallback(
    async ({ email, password, remember }: FieldValues) => {
      try {
        if (remember) {
          await setPersistence(auth, browserLocalPersistence);
        } else await setPersistence(auth, browserSessionPersistence);

        const { user } = await signInWithEmailAndPassword(auth, email, password);

        handleSignInUser(user);
      } catch (e) {
        throw new Error(e);
      }
    },
    [handleSignInUser]
  );

  return (
    <MotionWrapper>
      <PageForm content={content} inputsArray={inputsArray} schema={schema} submitHandler={handleSubmitForm}>
        {(requestHandler, isLoadingState) => <SocialMediaAuth handleRequest={requestHandler} isLoading={isLoadingState} />}
      </PageForm>
    </MotionWrapper>
  );
};

export default Login;

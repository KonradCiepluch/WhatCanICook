import React, { useEffect, useCallback } from 'react';
import { signOut, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/router';
import * as yup from 'yup';

import { auth } from 'firebaseInit/firebase';
import DefaultProfile from 'assets/defaultPic.png';
import { Button, Message, Spinner, MotionWrapper, NavLink } from 'components/Atoms';
import { PageForm } from 'components/Organisms';
import { useUser } from 'context/UserProvider';
import useRequestState from 'hooks/useRequestState';
import styles from 'components/Organisms/PageForm/PageForm.module.scss';
import userStyles from './User.module.scss';

const [pictureContent, firstNameContent, lastNameContent] = [
  {
    heading: 'Zmień zdjęcie profilowe',
    submitLabel: 'Wyślij',
    successMessage: 'Zdjęcie zostało zmienione',
  },
  {
    heading: 'Zmień imię',
    submitLabel: 'Wyślij',
    successMessage: 'Imię zostało zmienione',
  },
  {
    heading: 'Zmień nazwisko',
    submitLabel: 'Wyślij',
    successMessage: 'Nazwisko zostało zmienione',
  },
];

const [pictureInputs, firstNameInputs, lastNameInputs] = [
  [{ placeholder: 'Podaj url do zdjęcia', name: 'image' }],
  [{ placeholder: 'Wpisz imię', name: 'firstname' }],
  [{ placeholder: 'Wpisz nazwisko', name: 'lastname' }],
];

const [imageSchema, firstNameSchema, surnameSchema] = [
  yup.object().shape({
    image: yup.string().min(10, 'Adres do zdjęcia jest za krótki').required('Adres zdjęcia jest wymagany'),
  }),
  yup.object().shape({
    firstname: yup.string().min(2, 'Imię jest za krótkie').required('Imię jest wymagane'),
  }),
  yup.object().shape({
    lastname: yup.string().min(2, 'Nazwisko jest za krótkie').required('Nazwisko jest wymagane'),
  }),
];

const User = () => {
  const [{ isErrorState, isLoadingState, isSuccessState, errMsg }, handleRequest] = useRequestState(true);

  const { handleSignOutUser, authenticatedUser } = useUser();

  const { push } = useRouter();

  useEffect(() => {
    if (!authenticatedUser) {
      push('/login');
      return;
    }
    setTimeout(() => handleRequest('none'), 150);
  }, [handleRequest, authenticatedUser, push]);

  const handleUpdateProfile = useCallback(
    async (valueToChange: 'displayName' | 'photoURL', value: string) => {
      try {
        await updateProfile(authenticatedUser, { [valueToChange]: value });
      } catch (e) {
        throw new Error(e);
      }
    },
    [authenticatedUser]
  );

  const handleChangeFirstName = useCallback(
    async ({ firstname }) => {
      const { displayName } = authenticatedUser;
      const [, surname] = displayName.split(' ');
      await handleUpdateProfile('displayName', `${firstname} ${surname}`);
    },
    [authenticatedUser, handleUpdateProfile]
  );

  const handleChangeSurname = useCallback(
    async ({ lastname }) => {
      const { displayName } = authenticatedUser;
      const [firstname] = displayName.split(' ');
      await handleUpdateProfile('displayName', `${firstname} ${lastname}`);
    },
    [authenticatedUser, handleUpdateProfile]
  );

  const handleChangePhoto = useCallback(
    async ({ image }) => {
      await handleUpdateProfile('photoURL', image);
    },
    [handleUpdateProfile]
  );

  const handleClick = async () => {
    try {
      handleRequest('pending');
      await signOut(auth);
      handleSignOutUser();
      handleRequest('success');
    } catch (e) {
      handleRequest('error', e.message);
    }
  };

  return isSuccessState ? (
    <Message message="Zostałeś wylogowany" />
  ) : isLoadingState ? (
    <Spinner />
  ) : (
    <MotionWrapper className={styles.form}>
      <h1 className={styles.form__heading}>Strona użytkownika</h1>
      <div className={userStyles.user}>
        <img src={authenticatedUser.photoURL || DefaultProfile.src} alt="profile picture" className={userStyles.user__picture} />
        <p className={userStyles.user__name}>{authenticatedUser.displayName}</p>
        <NavLink href="/uzytkownik/przepis" label="Dodaj przepis" className={userStyles.user__link} />
      </div>
      <Button type="button" label="Wyloguj się" handleClick={handleClick} isLoading={isLoadingState} />
      {isErrorState ? <span className={styles.form__error}>{errMsg}</span> : null}
      <PageForm content={pictureContent} inputsArray={pictureInputs} schema={imageSchema} submitHandler={handleChangePhoto} />
      <PageForm content={firstNameContent} inputsArray={firstNameInputs} schema={firstNameSchema} submitHandler={handleChangeFirstName} />
      <PageForm content={lastNameContent} inputsArray={lastNameInputs} schema={surnameSchema} submitHandler={handleChangeSurname} />
    </MotionWrapper>
  );
};

export default User;

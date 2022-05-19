import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import Link from 'next/link';

import { auth, facebookProvider, googleProvider, githubProvider } from 'firebaseInit/firebase';
import { useUser } from 'context/UserProvider';
import { Button } from 'components/Atoms';
import { ProvidersType } from 'interfaces';
import styles from './SocialMediaAuth.module.scss';

const providers = [
  { provider: facebookProvider, label: 'Zaloguj się przez Facebook', iconClass: 'fab fa-facebook' },
  { provider: googleProvider, label: 'Zaloguj się przez Google', iconClass: 'fab fa-google' },
  { provider: githubProvider, label: 'Zaloguj się przez GitHub', iconClass: 'fab fa-github' },
];

interface IProps {
  handleRequest: (handler: () => Promise<void>, msg?: string) => void;
  isLoading: boolean;
}

const SocialMediaAuth = ({ handleRequest, isLoading }: IProps) => {
  const { handleSignInUser } = useUser();

  const signInWithProvider = async (provider: ProvidersType) => {
    try {
      const { user } = await signInWithPopup(auth, provider);
      handleSignInUser(user);
    } catch (e) {
      throw new Error(e);
    }
  };

  const buttons = providers.map(({ provider, label, iconClass }) => (
    <div key={label} className={styles['form__media-field']}>
      <span>lub</span>
      <Button
        type="button"
        label={label}
        isLoading={isLoading}
        handleClick={() => handleRequest(() => signInWithProvider(provider))}
        className={styles['form__media-button']}
        disabled={isLoading}
        iconClass={iconClass}
      />
    </div>
  ));

  return (
    <div className={styles['form__media-wrapper']}>
      {buttons}
      <h2>Nie posiadasz konta?</h2>
      <Link href="/rejestracja">Zarejestruj się</Link>
    </div>
  );
};

export default SocialMediaAuth;

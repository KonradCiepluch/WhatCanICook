import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import { useUser } from 'context/UserProvider';
import { auth } from 'firebaseInit/firebase';
import logoImage from 'assets/logo.png';
import styles from './Layout.module.scss';

const navLinks = [
  {
    label: 'Logowanie',
    href: '/login',
  },
  {
    label: 'Rejestracja',
    href: '/rejestracja',
  },
  {
    label: 'Strona użytkownika',
    href: '/uzytkownik',
  },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { handleSignInUser } = useUser();

  useEffect(() => {
    const unSubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user && user.metadata.creationTime === user.metadata.lastSignInTime) {
        signOut(auth);
      } else if (user) handleSignInUser(user);
    });

    return () => unSubscribeAuth();
  }, [handleSignInUser]);

  const links = navLinks.map(({ label, href }) => (
    <Link key={label} href={href}>
      {label}
    </Link>
  ));

  return (
    <>
      <nav className={styles.menu}>
        <Image src={logoImage} width={100} height={100} alt="site logo" />
        <div className={styles.menu__user}>
          <span className="fas fa-user" />
          <div className={styles.menu__links}>{links}</div>
        </div>
      </nav>
      {children}
    </>
  );
};

export default Layout;

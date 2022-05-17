import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { AnimatePresence } from 'framer-motion';

import { useUser } from 'context/UserProvider';
import { auth } from 'firebaseInit/firebase';
import { ICategory } from 'interfaces/Menu';
import { IRecipe } from 'interfaces/Recipe';
import { Navigation, SearchBar } from 'components/Molecules';
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

interface ILayout {
  children: React.ReactNode;
  categories: ICategory[];
  recipes: IRecipe[];
}

const Layout = ({ children, categories, recipes }: ILayout) => {
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
    <div className={styles.page}>
      <nav className={styles.menu}>
        <Link href="/">
          <a>
            <Image src={logoImage} width={100} height={100} alt="site logo" />
          </a>
        </Link>
        <Navigation categories={categories} />
        <SearchBar recipes={recipes} />
        <div className={styles.menu__user}>
          <span className="fas fa-user" />
          <div className={styles.menu__links}>{links}</div>
        </div>
      </nav>
      <AnimatePresence exitBeforeEnter>{children}</AnimatePresence>
    </div>
  );
};

export default Layout;

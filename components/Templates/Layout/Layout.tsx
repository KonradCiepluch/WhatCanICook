import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { AnimatePresence, motion } from 'framer-motion';

import { useUser } from 'context/UserProvider';
import { auth } from 'firebaseInit/firebase';
import { ICategory, IRecipe } from 'interfaces';
import { Navigation, SearchBar, Footer, MobileMenu } from 'components/Molecules';
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

const navVariant = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

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
      <motion.nav className={styles.menu} variants={navVariant} initial="hidden" animate="visible">
        <Link href="/">
          <a className={styles.menu__logo}>
            <Image src={logoImage} layout="fill" alt="site logo" />
          </a>
        </Link>
        <Navigation categories={categories} />
        <SearchBar recipes={recipes} />
        <div className={styles.menu__user}>
          <span className="fas fa-user" />
          <div className={styles.menu__links}>{links}</div>
        </div>
        <MobileMenu categories={categories} userLinks={navLinks} />
      </motion.nav>
      <AnimatePresence exitBeforeEnter>{children}</AnimatePresence>
      <Footer />
    </div>
  );
};

export default Layout;

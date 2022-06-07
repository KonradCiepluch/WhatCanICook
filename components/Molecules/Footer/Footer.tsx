import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import logoImage from 'assets/logo.png';
import styles from './Footer.module.scss';

const linksContent = [
  { label: 'Strona główna', href: '/' },
  { label: 'Logowanie', href: '/login' },
  { label: 'Rejestracja', href: '/rejestracja' },
  { label: 'Dodaj przepis', href: '/uzytkownik/przepis' },
];

const tapAnimation = {
  opacity: 0.3,
};

const hoverAnimation = {
  opacity: 0.5,
};

const footerVariant = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      delay: 0.2,
    },
  },
};

const Footer = () => {
  const [ref, inView] = useInView({ threshold: 0.5 });

  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);

  const links = linksContent.map(({ label, href }) => (
    <Link key={label} href={href}>
      <motion.a className={styles.footer__link} whileHover={hoverAnimation} whileTap={tapAnimation}>
        {label}
      </motion.a>
    </Link>
  ));

  return (
    <motion.footer className={styles.footer} ref={ref} animate={controls} initial="hidden" variants={footerVariant}>
      <div className={styles.footer__image}>
        <Image src={logoImage} width={100} height={100} alt="site logo" />
      </div>
      <nav className={styles.footer__nav}>{links}</nav>
      <p className={styles.footer__author}>
        Made by
        <motion.a href="https://github.com/KonradCiepluch" className={styles.footer__link} whileHover={hoverAnimation} whileTap={tapAnimation}>
          <span className="fab fa-github" />
          Konrad Ciepluch
        </motion.a>
      </p>
    </motion.footer>
  );
};

export default Footer;

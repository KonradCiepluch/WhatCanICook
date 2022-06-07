import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { NavLink, Accordion, MobileMenuListElement } from 'components/Atoms';
import { ICategory } from 'interfaces';
import styles from './MobileMenu.module.scss';

const listVariant = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
  exit: { scale: 0, opacity: 0 },
};

type Props = { categories: ICategory[]; userLinks: { label: string; href: string }[] };

const MobileMenu = ({ categories, userLinks }: Props) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => setIsActive((prevState) => !prevState);

  const links = userLinks.map(({ href, label }) => (
    <li key={label} onClick={handleClick}>
      <NavLink href={href} label={label} className={styles.mobile__link}>
        <span className={`fas fa-long-arrow-alt-right ${styles.arrow}`} />
      </NavLink>
    </li>
  ));

  const categoryLinks = categories.map(({ slug, name, subcategories, photo }) => (
    <Accordion key={name} heading={name} className={styles.mobile__link}>
      <motion.ul className={styles.mobile__list} variants={listVariant} initial="hidden" animate="visible" exit="exit">
        <MobileMenuListElement photo={photo} href={`/przepisy/${slug}`} label={name} linkClassName={styles.mobile__link} handleClick={handleClick} />
        {subcategories.map(({ name: subName, slug: href, photo: subPhoto }) => (
          <MobileMenuListElement
            key={subName}
            photo={subPhoto}
            href={`/przepisy/${slug}/${href}`}
            label={subName}
            linkClassName={styles.mobile__link}
            handleClick={handleClick}
          />
        ))}
      </motion.ul>
    </Accordion>
  ));

  return (
    <>
      <button className={`${styles.control} ${isActive ? styles.control__active : ''}`} onClick={handleClick} data-cy="burger">
        <span className={styles.control__bar} />
        <span className={styles.control__bar} />
        <span className={styles.control__bar} />
      </button>
      <div className={`${styles.layer} ${isActive ? styles.layer__active : ''}`} onClick={handleClick} />
      <nav className={`${styles.mobile} ${isActive ? styles.mobile__active : ''}`}>
        <Accordion heading="Przepisy" className={styles.mobile__link}>
          <motion.ul className={styles.mobile__list} variants={listVariant} initial="hidden" animate="visible" exit="exit">
            {categoryLinks}
          </motion.ul>
        </Accordion>
        <NavLink href="/blog" label="Blog" className={styles.mobile__link} handleClick={handleClick}>
          <span className={`fas fa-long-arrow-alt-right ${styles.arrow}`} />
        </NavLink>
        <Accordion heading="Użytkownik" className={styles.mobile__link}>
          <motion.ul key="users" className={styles.mobile__list} variants={listVariant} initial="hidden" animate="visible" exit="exit">
            {links}
          </motion.ul>
        </Accordion>
      </nav>
    </>
  );
};

export default MobileMenu;

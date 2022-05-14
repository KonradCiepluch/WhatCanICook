import React from 'react';

import { NavLink } from 'components/Atoms';
import styles from './BreadCrumbs.module.scss';

type Props = { links: { href: string; label: string }[]; className?: string };

const BreadCrumbs = ({ links, className = '' }: Props) => {
  const items = links.map(({ href, label }) => <NavLink key={label} href={href} label={label} className={styles.navigation__link} />);

  return <nav className={`${styles.navigation} ${className}`}>{items}</nav>;
};

export default BreadCrumbs;

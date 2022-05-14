import React from 'react';
import Link from 'next/link';

import styles from './NavLink.module.scss';

type Props = { href: string; label: string; className?: string };

const NavLink = ({ href, label, className = '' }: Props) => {
  return (
    <Link href={href}>
      <a className={`${styles.link} ${className}`}>{label}</a>
    </Link>
  );
};

export default NavLink;

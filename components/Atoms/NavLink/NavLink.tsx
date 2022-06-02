import React, { ReactNode } from 'react';
import Link from 'next/link';

import styles from './NavLink.module.scss';

type Props = { href: string; label: string; className?: string; children?: ReactNode };

const NavLink = ({ href, label, className = '', children }: Props) => {
  return (
    <Link href={href}>
      <a className={`${styles.link} ${className}`}>
        {label}
        {children}
      </a>
    </Link>
  );
};

export default NavLink;

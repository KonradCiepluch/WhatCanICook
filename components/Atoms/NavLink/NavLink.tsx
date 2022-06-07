import React, { ReactNode } from 'react';
import Link from 'next/link';

import styles from './NavLink.module.scss';

type Props = { href: string; label: string; className?: string; children?: ReactNode; handleClick?: () => void };

const NavLink = ({ href, label, className = '', children, handleClick }: Props) => {
  return (
    <Link href={href}>
      <a className={`${styles.link} ${className}`} onClick={handleClick} data-cy={label}>
        {label}
        {children}
      </a>
    </Link>
  );
};

export default NavLink;

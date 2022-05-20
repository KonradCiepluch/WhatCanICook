import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './SearchElement.module.scss';

type Props = { href: string; photoUrl: string; label: string; handleClear: () => void; className?: string };

const SearchElement = ({ href, photoUrl, label, handleClear, className = '' }: Props) => (
  <li className={`${styles.element}  ${className}`} onClick={handleClear}>
    <Link href={href}>
      <a className={styles.element__link}>
        <Image src={photoUrl} width={50} height={50} />
        <span className={styles.element__label}> {label}</span>
      </a>
    </Link>
  </li>
);

export default SearchElement;

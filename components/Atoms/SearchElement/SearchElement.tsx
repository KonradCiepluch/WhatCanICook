import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './SearchElement.module.scss';

type Props = { href: string; photoUrl: string; label: string; className?: string };

const SearchElement = ({ href, photoUrl, label, className = '' }: Props) => (
  <li className={`${styles.element}  ${className}`}>
    <Link href={href}>
      <a className={styles.element__link}>
        <Image src={photoUrl} width={50} height={50} />
        <span className={styles.element__label}> {label}</span>
      </a>
    </Link>
  </li>
);

export default SearchElement;

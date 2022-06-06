import React from 'react';
import Image from 'next/image';

import { NavLink } from 'components/Atoms';
import styles from './MobileMenuListElement.module.scss';

type Props = { label: string; href: string; photo: string; linkClassName: string; handleClick: () => void };

const MobileMenuListElement = ({ label, href, photo, linkClassName, handleClick }: Props) => {
  return (
    <li className={styles.element}>
      <NavLink label="" href={href} className={`${styles.element__link} ${linkClassName}`} handleClick={handleClick}>
        <Image src={photo} width={50} height={50} />
        <span>{label}</span>
        <span className={`fas fa-long-arrow-alt-right ${styles.arrow}`} />
      </NavLink>
    </li>
  );
};

export default MobileMenuListElement;

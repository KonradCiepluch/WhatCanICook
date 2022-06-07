import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import styles from './Accordion.module.scss';

type Props = { heading: string; className: string; children: React.ReactNode };

const Accordion = ({ heading, className, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen((prevState) => !prevState);

  return (
    <div className={styles.wrapper}>
      <button onClick={handleClick} className={`${className} ${styles.wrapper__button} ${isOpen ? styles.wrapper__active : ''}`} data-cy={heading}>
        {heading} <span className="fas fa-caret-right" />
      </button>
      <AnimatePresence>{isOpen ? children : null}</AnimatePresence>
    </div>
  );
};

export default Accordion;

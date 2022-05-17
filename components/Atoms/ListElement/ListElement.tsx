import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import closeIcon from 'assets/close.svg';
import styles from './ListElement.module.scss';

const slideVariant = {
  hidden: { x: '-5vw', opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.2 } },
  exit: { x: '5vw', opacity: 0, transition: { duration: 0.2 } },
};

const whileHoverAnimation = {
  scale: 0.85,
  duration: 0.2,
};

const whileTapAnimation = {
  scale: 0.7,
  duration: 0.2,
};

interface IProps {
  id: string;
  handleRemove: (id: string) => void;
  children: React.ReactNode;
}

const ListElement = ({ id, handleRemove, children }: IProps) => {
  return (
    <motion.li key={id} variants={slideVariant} initial="hidden" animate="visible" exit="exit" className={styles.element}>
      {children}
      <motion.button
        type="button"
        className={styles.element__button}
        whileHover={whileHoverAnimation}
        whileTap={whileTapAnimation}
        onClick={() => handleRemove(id)}
      >
        <Image src={closeIcon.src} layout="fill" />
      </motion.button>
    </motion.li>
  );
};

export default ListElement;

import React from 'react';
import { motion } from 'framer-motion';

import Spinner from 'components/Atoms/Spinner/Spinner';
import styles from './Button.module.scss';

interface IProps {
  isLoading: boolean;
  label: string;
  className?: string;
  type?: 'submit' | 'button' | 'reset';
  disabled?: boolean;
  iconClass?: string;
  handleClick?: () => void;
}

const tapAnimation = {
  scale: 0.9,
};

const hoverAnimation = {
  scale: 0.97,
};

const Button = ({ type = 'submit', isLoading, className, label, disabled, iconClass, handleClick }: IProps) => (
  <motion.button
    type={type}
    onClick={handleClick}
    className={`${styles.button} ${className}`}
    disabled={disabled}
    whileTap={tapAnimation}
    whileHover={hoverAnimation}
  >
    {isLoading ? <Spinner /> : null}
    {label}
    {iconClass ? <span className={iconClass} /> : null}
  </motion.button>
);

export default Button;

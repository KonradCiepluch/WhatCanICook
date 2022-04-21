import React from 'react';
import Spinner from 'components/Atoms/Spinner/Spinner';

interface IProps {
  isLoading: boolean;
  label: string;
  className: string;
  type?: 'submit' | 'button' | 'reset';
  disabled?: boolean;
  iconClass?: string;
  handleClick?: () => void;
}

const Button = ({ type = 'submit', isLoading, className, label, disabled, iconClass, handleClick }: IProps) => (
  <button type={type} onClick={handleClick} className={className} disabled={disabled}>
    {isLoading ? <Spinner /> : null}
    {label}
    {iconClass ? <span className={iconClass} /> : null}
  </button>
);

export default Button;

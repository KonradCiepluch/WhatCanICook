import React from 'react';

import styles from './SearchInput.module.scss';

type Props = {
  isActive: boolean;
  inputValue: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
};

const SearchInput = ({ isActive, handleClick, inputValue, handleChange }: Props) => {
  return (
    <div className={`${styles.search} ${isActive ? `${styles['search--active']}` : ''}`}>
      <input type="text" placeholder="Wyszukaj przepis ..." className={styles.search__input} value={inputValue} onChange={handleChange} />
      <button className={styles.search__button} onClick={handleClick} data-cy="search">
        <span className="fas fa-search" />
      </button>
    </div>
  );
};

export default SearchInput;

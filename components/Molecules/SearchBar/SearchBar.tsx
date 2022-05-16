import React, { useState, useEffect, useCallback, useRef } from 'react';
import debounce from 'lodash.debounce';
import { useOnClickOutside } from 'usehooks-ts';

import { IRecipe } from 'interfaces/Recipe';
import { SearchInput, SearchElement } from 'components/Atoms';
import styles from './SearchBar.module.scss';

interface IProps {
  recipes: IRecipe[];
}

const SearchBar = ({ recipes }: IProps) => {
  const [inputValue, setInputValue] = useState('');

  const [foundRecipes, setFoundRecipes] = useState<IRecipe[]>([]);

  const [isActive, setIsActive] = useState(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(wrapperRef, () => setIsActive(false));

  const handleClick = useCallback(() => setIsActive(true), []);

  const handleChange = useCallback(({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setInputValue(value), []);

  const searchRecipes = useCallback(
    debounce((searchPhrase: string) => {
      const recipesByPhrase = recipes.filter(({ name }) => name.toLowerCase().startsWith(searchPhrase.toLowerCase()));
      setFoundRecipes(recipesByPhrase);
    }, 400),
    []
  );

  useEffect(() => {
    if (!inputValue) return;
    searchRecipes(inputValue);
  }, [inputValue, searchRecipes]);

  const items = foundRecipes.map(({ name, photo, slug, category: { categorySlug, subcategorySlug } }) => (
    <SearchElement key={name} href={`/przepisy/${categorySlug}/${subcategorySlug}/${slug}`} photoUrl={photo} label={name} />
  ));

  const isListActive = isActive && inputValue && foundRecipes.length;

  const isErrorInfo = isActive && inputValue && !foundRecipes.length;

  return (
    <div className={styles.searchBar} ref={wrapperRef}>
      <SearchInput isActive={isActive} handleClick={handleClick} inputValue={inputValue} handleChange={handleChange} />
      {isListActive ? <ul className={styles.searchBar__list}>{items}</ul> : null}
      {isErrorInfo ? <p className={styles.searchBar__info}>Brak przepisów dla wpisanej frazy</p> : null}
    </div>
  );
};

export default SearchBar;

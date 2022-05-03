import React, { useState, useCallback, useMemo } from 'react';
import * as yup from 'yup';
import { FieldValues } from 'react-hook-form';

import { MotionWrapper } from 'components/Atoms';
import { PageForm } from 'components/Organisms';
import { ICategory, ISubcategory } from 'interfaces/Menu';
import { IRecipe } from 'interfaces/Recipe';
import imgFileTypes from 'utils/imgFileTypes';
import { uploadImage, addRecipe } from 'lib/firebaseData';
import styles from './AddRecipe.module.scss';

type Props = { categories: ICategory[] };

// regexp for time range 5 too 500
const timeRangeRegexp = /^(500|[1-4][0-9][0-9]|[1-9][0-9]|[5-9])$/;

const schema = yup.object().shape({
  name: yup.string().min(3, 'Nazwa dania powinna zawierać min 3 znaki').required('Nazwa dania jest wymagana'),
  category: yup.string().required('Kategoria jest wymagana'),
  subcategory: yup.string().required('Podkategoria jest wymagana'),
  photo: yup
    .mixed()
    .test('required', 'Zdjęcie jest wymagane', (value) => value && value.length)
    .test('fileType', 'Format zdjęcia jest niepoprawny', ([value]) => value && imgFileTypes.includes(value.type)),
  level: yup.string().required('Poziom trudności jest wymagany'),
  time: yup
    .string()
    .matches(timeRangeRegexp, { message: 'Czas przygotowania powinien wynosić od 5 do 500 minut', excludeEmptyString: true })
    .required('Czas przygotowania jest wymagany'),
});

const formContent = { heading: 'Dodaj nowy przepis', successMessage: 'Przepis został dodany, dziękujemy!', submitLabel: 'Wyślij' };

const difficultyLevels = [1, 2, 3];

const AddRecipe = ({ categories }: Props) => {
  const [category, setCategory] = useState('');

  const [subcategories, setSubcategories] = useState<ISubcategory[]>([]);

  const handleChange = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) => {
      setCategory(value);
      const foundCategory = categories.find(({ name }) => name === value);

      if (!foundCategory) return;

      setSubcategories(foundCategory.subcategories);
    },
    [categories]
  );

  const handleSubmit = useCallback(async ({ photo, name, category: catName, subcategory, level, time }: FieldValues) => {
    try {
      const photos = photo as FileList;
      const firstPhoto = photos[0];
      const photoUrl = await uploadImage(firstPhoto);

      const recipe = {
        name,
        category: { name: catName, subcategory },
        photo: photoUrl,
        difficultyLevel: Number(level),
        time,
      } as IRecipe;

      await addRecipe(recipe);
    } catch (e) {
      throw new Error(e);
    }
  }, []);

  const formInputs = useMemo(
    () => [
      {
        placeholder: 'Nazwa dania',
        name: 'name',
      },
      {
        type: 'select',
        label: 'Kategoria',
        options: categories.map(({ name }) => name),
        name: 'category',
        hiddenOption: 'Wybierz kategorię',
        changeHandler: handleChange,
      },
      {
        type: 'select',
        label: 'Podkategoria',
        options: subcategories.map(({ name }) => name),
        name: 'subcategory',
        hiddenOption: 'Wybierz podkategorię',
        disabled: !category,
      },
      {
        name: 'photo',
        type: 'file',
        label: 'Zdjęcie dania',
      },
      {
        type: 'select',
        label: 'Poziom trudności',
        options: difficultyLevels,
        name: 'level',
        hiddenOption: 'Wybierz poziom trudności',
      },
      {
        placeholder: 'Czas przygotowania',
        name: 'time',
      },
    ],
    [category, categories, handleChange, subcategories]
  );

  return (
    <MotionWrapper className={styles.select}>
      <PageForm content={formContent} inputsArray={formInputs} schema={schema} submitHandler={handleSubmit} />
    </MotionWrapper>
  );
};

export default AddRecipe;

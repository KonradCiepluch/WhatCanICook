import React, { useState, useCallback, useMemo, useEffect } from 'react';
import * as yup from 'yup';
import { FieldValues } from 'react-hook-form';
import { useRouter } from 'next/router';

import { MotionWrapper } from 'components/Atoms';
import { ProductsList, StepsList, SelectTag } from 'components/Molecules';
import { PageForm } from 'components/Organisms';
import { ICategory, ISubcategory } from 'interfaces/Menu';
import { IRecipe } from 'interfaces/Recipe';
import getSlug from 'utils/getSlug';
import imgFileTypes from 'utils/imgFileTypes';
import getStepsWithUrl from 'utils/getStepsWithUrl';
import { uploadImage, addRecipe } from 'lib/firebaseData';
import { useUser } from 'context/UserProvider';
import { useDetailsContext } from 'context/DetailsProvider';

type Props = { categories: ICategory[]; tags: string[] };

// regexp for time range 5 too 500
const timeRangeRegexp = /^(500|[1-4][0-9][0-9]|[1-9][0-9]|[5-9])$/;
// rexexp for youtube link
const youtubeRegexp = new RegExp('^https://www.youtube.com/');

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
  youtube: yup.string().matches(youtubeRegexp, { message: 'Proszę podać prawidłowy link do video na YouTube', excludeEmptyString: true }),
  products: yup.number().min(2, 'Dodaj przynajmniej dwa produkty do listy zakupów'),
  tags: yup.number().min(2, 'Lista tagów powinna zawierać przynajmniej dwa tagi'),
  steps: yup.number().min(2, 'Przygotowanie dania powinno zawierać przynajmniej dwa etapy'),
});

const formContent = { heading: 'Dodaj nowy przepis', successMessage: 'Przepis został dodany, dziękujemy!', submitLabel: 'Wyślij' };

const difficultyLevels = [1, 2, 3];

const AddRecipe = ({ categories, tags }: Props) => {
  const [category, setCategory] = useState('');

  const [subcategories, setSubcategories] = useState<ISubcategory[]>([]);

  const {
    state: { steps, products, tags: tagList },
  } = useDetailsContext();

  const { push } = useRouter();

  const { authenticatedUser } = useUser();

  useEffect(() => {
    if (!authenticatedUser) push('/');
  }, [authenticatedUser, push]);

  const handleChange = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) => {
      setCategory(value);
      const foundCategory = categories.find(({ name }) => name === value);

      if (!foundCategory) return;

      setSubcategories(foundCategory.subcategories);
    },
    [categories]
  );

  const shoppingList = useMemo(() => products.map(({ name, amount, unit }) => ({ product: { name, amount: `${amount} ${unit}` } })), [products]);

  const handleSubmit = useCallback(
    async ({ photo, name, category: catName, subcategory, level, time }: FieldValues) => {
      try {
        const photos = photo as FileList;
        const firstPhoto = photos[0];
        const photoUrl = await uploadImage(firstPhoto);

        const stepsWithUrl = await getStepsWithUrl(steps);

        const recipe = {
          name,
          slug: getSlug(name),
          category: { name: catName, subcategory },
          photo: photoUrl,
          difficultyLevel: Number(level),
          shoppingList,
          steps: stepsWithUrl,
          tags: tagList,
          time,
        } as IRecipe;

        await addRecipe(recipe);
      } catch (e) {
        throw new Error(e);
      }
    },
    [tagList, shoppingList, steps]
  );

  const formInputs = useMemo(
    () => [
      {
        type: 'text',
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
        type: 'file',
        name: 'photo',
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
        type: 'text',
        placeholder: 'Czas przygotowania',
        name: 'time',
      },
      {
        type: 'text',
        placeholder: 'Link do tutorialu na YouTube',
        name: 'youtube',
      },
    ],
    [category, categories, handleChange, subcategories]
  );

  return (
    <MotionWrapper>
      <PageForm content={formContent} inputsArray={formInputs} schema={schema} submitHandler={handleSubmit} isBeforeSubmit>
        {(handleRequest, isLoadingState, isSuccessState) => (
          <>
            <ProductsList isSuccess={isSuccessState} />
            <SelectTag tags={tags} isSuccess={isSuccessState} />
            <StepsList />
          </>
        )}
      </PageForm>
    </MotionWrapper>
  );
};

export default AddRecipe;

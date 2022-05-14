import React, { useReducer, useContext, useCallback, createContext } from 'react';

import { IRecipeDetailsState, IDetailsContext, Actions } from './types';
import recipeReducer from './reducer';

export const initialState: IRecipeDetailsState = {
  product: { name: '', amount: '', unit: 'gram', id: '' },
  step: { description: '', id: '', url: '' },
  tags: [],
  products: [],
  steps: [],
  errors: {
    products: [],
    steps: [],
  },
};

const DetailsContext = createContext<IDetailsContext | null>(null);

const DetailsProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(recipeReducer, initialState);

  const handleChangeField = useCallback(
    ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const type = ['description', 'url'].includes(name) ? 'step' : 'product';
      dispatch({ type: Actions.changeValue, payload: { name, value, type } });
    },
    []
  );

  const handleChangeTags = useCallback((tags: string[]) => dispatch({ type: Actions.changeTags, payload: { tags } }), []);

  const handleAddProduct = useCallback(() => dispatch({ type: Actions.addProduct }), []);

  const handleRemoveProduct = useCallback((id: string) => dispatch({ type: Actions.removeProduct, payload: { id } }), []);

  const handleChangeFile = useCallback((file?: File) => {
    if (!file) return dispatch({ type: Actions.changeValue, payload: { name: 'photo', value: '', type: 'step' } });

    dispatch({ type: Actions.changeValue, payload: { name: 'photo', value: file, type: 'step' } });
  }, []);

  const handleAddStep = useCallback(() => dispatch({ type: Actions.addStep }), []);

  const handleRemoveStep = useCallback((id: string) => dispatch({ type: Actions.removeStep, payload: { id } }), []);

  const handleReset = useCallback(() => dispatch({ type: Actions.resetState }), []);

  return (
    <DetailsContext.Provider
      value={{
        state,
        handlers: {
          handleChangeField,
          handleChangeTags,
          handleAddProduct,
          handleRemoveProduct,
          handleChangeFile,
          handleAddStep,
          handleRemoveStep,
          handleReset,
        },
      }}
    >
      {children}
    </DetailsContext.Provider>
  );
};

export const useDetailsContext = () => {
  const ctx = useContext(DetailsContext);

  if (!ctx) throw new Error('useDetailsContext must be used inside DetailsProvider');

  return ctx;
};

export default DetailsProvider;

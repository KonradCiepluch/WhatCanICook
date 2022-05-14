import React, { useReducer, useContext, useCallback, createContext } from 'react';
import { v4 as uuid } from 'uuid';

import Validator from 'utils/Vallidator';

type UnitsType = 'gram' | 'kg' | 'szt' | 'ml' | 'l';

export interface IProduct {
  name: string;
  amount: string;
  unit: UnitsType;
  id: string;
}

export interface IStep {
  description: string;
  id: string;
  url?: string;
  photo?: File;
}

interface IRecipeDetailsState {
  product: IProduct;
  step: IStep;
  tags: string[];
  products: IProduct[];
  steps: IStep[];
  errors: {
    products: string[];
    steps: string[];
  };
}

const initialState: IRecipeDetailsState = {
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

enum Actions {
  changeValue = 'change_value',
  changeTags = 'change_tags',
  addProduct = 'add_product',
  removeProduct = 'remove_product',
  addStep = 'add_step',
  removeStep = 'remove_step',
  resetState = 'reset_state',
}

type RecipeActions =
  | { type: Actions.changeValue; payload: { name: string; value: string | File; type: 'step' | 'product' } }
  | { type: Actions.changeTags; payload: { tags: string[] } }
  | { type: Actions.addProduct }
  | { type: Actions.removeProduct; payload: { id: string } }
  | { type: Actions.addStep }
  | { type: Actions.removeStep; payload: { id: string } }
  | { type: Actions.resetState };

interface IDetailsContext {
  state: IRecipeDetailsState;
  handlers: {
    handleChangeField: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    handleChangeTags: (tags: string[]) => void;
    handleAddProduct: () => void;
    handleRemoveProduct: (id: string) => void;
    handleAddStep: () => void;
    handleRemoveStep: (id: string) => void;
    handleChangeFile: (file?: File) => void;
    handleReset: () => void;
  };
}

const recipeReducer = (state: IRecipeDetailsState, action: RecipeActions) => {
  switch (action.type) {
    case Actions.changeValue:
      const { name, value } = action.payload;
      return { ...state, [action.payload.type]: { ...state[action.payload.type], [name]: value } };
    case Actions.changeTags:
      const { tags } = action.payload;
      return { ...state, tags };
    case Actions.addProduct:
      const productErrors = Validator.validateProduct({ name: state.product.name, amount: state.product.amount });

      if (productErrors) return { ...state, errors: { ...state.errors, products: productErrors.errors } };

      const product = { ...state.product, id: uuid() };
      return {
        ...state,
        products: [...state.products, product],
        errors: { ...state.errors, products: [] },
        product: { ...initialState.product },
      };
    case Actions.removeProduct:
      return { ...state, products: state.products.filter(({ id }) => id !== action.payload.id) };
    case Actions.addStep:
      const stepErrors = Validator.validateStep({ description: state.step.description, photo: state.step.photo, url: state.step.url });

      if (stepErrors) return { ...state, errors: { ...state.errors, steps: stepErrors.errors } };

      const step = { ...state.step, id: uuid() };
      return {
        ...state,
        steps: [...state.steps, step],
        errors: { ...state.errors, steps: [] },
        step: { ...initialState.step },
      };
    case Actions.removeStep:
      return { ...state, steps: state.steps.filter(({ id }) => id !== action.payload.id) };
    case Actions.resetState:
      return { ...initialState };
    default:
      return state;
  }
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

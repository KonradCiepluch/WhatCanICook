import { v4 as uuid } from 'uuid';

import Validator from 'utils/Vallidator';
import { IRecipeDetailsState, RecipeActions, Actions } from './types';
import { initialState } from './DetailsProvider';

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

export default recipeReducer;

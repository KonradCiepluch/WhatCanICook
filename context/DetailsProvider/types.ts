export type UnitsType = 'gram' | 'kg' | 'szt' | 'ml' | 'l';

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

export interface IRecipeDetailsState {
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

export enum Actions {
  changeValue = 'change_value',
  changeTags = 'change_tags',
  addProduct = 'add_product',
  removeProduct = 'remove_product',
  addStep = 'add_step',
  removeStep = 'remove_step',
  resetState = 'reset_state',
}

export type RecipeActions =
  | { type: Actions.changeValue; payload: { name: string; value: string | File; type: 'step' | 'product' } }
  | { type: Actions.changeTags; payload: { tags: string[] } }
  | { type: Actions.addProduct }
  | { type: Actions.removeProduct; payload: { id: string } }
  | { type: Actions.addStep }
  | { type: Actions.removeStep; payload: { id: string } }
  | { type: Actions.resetState };

export interface IDetailsContext {
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

import { IProduct } from 'context/DetailsProvider/types';

export interface IProductItem extends Omit<IProduct, 'id'> {}

interface IUserShoppingList {
  uid: string;
  products: IProductItem[];
  docId: string;
}

export default IUserShoppingList;

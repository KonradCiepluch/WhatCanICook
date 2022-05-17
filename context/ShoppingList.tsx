import React from 'react';

import { UnitsType } from './DetailsProvider/types';

type Props = {};

interface IProduct {
  name: string;
  amount: string;
  unit: UnitsType;
}

interface IShoppingListCtx {
  products: IProduct[];
}

const ShoppingList = (props: Props) => {
  const handleAddProducts = (products: IProduct[]) => {};

  return <div>ShoppingList</div>;
};

export default ShoppingList;

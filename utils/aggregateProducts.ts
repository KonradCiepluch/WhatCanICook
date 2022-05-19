import { IProductItem } from 'interfaces';

const aggregateProducts = (productsInList: IProductItem[], newProducts: IProductItem[]) => {
  const productsToAdd = [...newProducts];

  const updatedProductsList = productsInList.reduce((acc, product) => {
    const sameProductIndex = productsToAdd.findIndex(({ name, unit }) => name.toLowerCase() === product.name.toLowerCase() && unit === product.unit);

    if (sameProductIndex === -1) return [...acc, product];

    const foundSameProduct = productsToAdd[sameProductIndex];

    const updatedAmount = Number(product.amount) + Number(foundSameProduct.amount);

    const updatedProduct = { ...product, amount: updatedAmount.toString() };

    productsToAdd.splice(sameProductIndex, 1);

    return [...acc, updatedProduct];
  }, [] as IProductItem[]);

  return [...updatedProductsList, ...productsToAdd];
};

export default aggregateProducts;

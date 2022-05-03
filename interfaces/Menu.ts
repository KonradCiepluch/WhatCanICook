export interface ISubcategory {
  name: string;
  photo: string;
}

export interface ICategory {
  name: string;
  subcategories: ISubcategory[];
}

export interface ICategoriesCollection {
  categories: ICategory[];
}

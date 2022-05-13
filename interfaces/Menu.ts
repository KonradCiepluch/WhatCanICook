export interface ISubcategory {
  name: string;
  photo: string;
  slug: string;
}

export interface ICategory {
  name: string;
  slug: string;
  subcategories: ISubcategory[];
}

export interface ICategoriesCollection {
  categories: ICategory[];
}

import { ISubcategory } from './Menu';

export interface IRecipe extends ISubcategory {
  category: {
    name: string;
    categorySlug: string;
    subcategory: string;
    subcategorySlug: string;
  };
  difficultyLevel: 1 | 2 | 3;
  shoppingList: { product: { amount: string; name: string } }[];
  steps: { description: string; title: string; photo?: string; videoUrl?: string }[];
  tags: string[];
  time: number;
  youtubeUrl?: string;
}

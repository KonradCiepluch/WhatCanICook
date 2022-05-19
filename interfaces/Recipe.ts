import { UnitsType } from 'context/DetailsProvider/types';
import { ISubcategory } from './Menu';

export interface IRecipe extends ISubcategory {
  category: {
    name: string;
    categorySlug: string;
    subcategory: string;
    subcategorySlug: string;
  };
  difficultyLevel: 1 | 2 | 3;
  shoppingList: { amount: string; unit: UnitsType; name: string }[];
  steps: { description: string; title: string; photo?: string; videoUrl?: string }[];
  tags: string[];
  time: number;
  author: { name: string; email: string };
  youtubeUrl?: string;
}

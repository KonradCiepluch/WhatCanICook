import { Timestamp } from 'firebase/firestore';

export interface ISubcategory {
  name: string;
  photo: string;
  slug: string;
}

export interface ICategory {
  name: string;
  slug: string;
  photo: string;
  subcategories: ISubcategory[];
}

export interface ICategoriesCollection {
  categories: ICategory[];
}

interface IContent {
  heading: string;
  paragraphs: string[];
  list?: {
    listHeading: string;
    items: string[];
  };
}

export interface IBlogPostFireBase {
  isHighlighted?: boolean;
  author: string;
  content: IContent[];
  summary: string;
  date: Timestamp;
  photo: string;
  title: string;
  id: string;
}

export interface IBlogPost extends Omit<IBlogPostFireBase, 'date'> {
  date: string;
}

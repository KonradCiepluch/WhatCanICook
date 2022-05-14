import { getDocs, addDoc } from 'firebase/firestore';
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage';

import { recipesRef, categoriesRef, tagsRef, storage } from 'firebaseInit/firebase';
import { IRecipe } from 'interfaces/Recipe';
import { ICategoriesCollection } from 'interfaces/Menu';

const getRecipes = async () => {
  try {
    const { docs } = await getDocs(recipesRef);

    const recipes = docs.map((doc) => ({ ...doc.data() })) as IRecipe[];

    return recipes;
  } catch (e) {
    throw new Error(e);
  }
};

const getCategories = async () => {
  try {
    const { docs } = await getDocs(categoriesRef);

    const [{ categories }] = docs.map((doc) => doc.data()) as ICategoriesCollection[];

    return categories;
  } catch (e) {
    throw new Error(e);
  }
};

const getTags = async () => {
  try {
    const { docs } = await getDocs(tagsRef);

    const [{ data }] = docs.map((doc) => doc.data());

    return data as string[];
  } catch (e) {
    throw new Error(e);
  }
};

const uploadImage = async (photo: File) => {
  try {
    const storageRef = ref(storage, `images/${photo.name}`);
    const { ref: uploadRef } = await uploadBytes(storageRef, photo);
    const photoUrl = await getDownloadURL(uploadRef);
    return photoUrl;
  } catch (e) {
    throw new Error(e);
  }
};

const addRecipe = async (recipe: IRecipe) => {
  try {
    const result = await addDoc(recipesRef, recipe);
    console.log(result);
  } catch (e) {
    throw new Error(e);
  }
};

export { getRecipes, getCategories, getTags, uploadImage, addRecipe };

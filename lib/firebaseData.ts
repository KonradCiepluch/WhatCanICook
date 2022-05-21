import { getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage';

import { recipesRef, categoriesRef, tagsRef, userListsRef, getUserListRef, storage } from 'firebaseInit/firebase';
import { IRecipe, IUserShoppingList, IProductItem, ICategoriesCollection } from 'interfaces';
import aggregateProducts from 'utils/aggregateProducts';

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
    await addDoc(recipesRef, recipe);
  } catch (e) {
    throw new Error(e);
  }
};

const getShoppingList = async (userId: string) => {
  try {
    const { docs } = await getDocs(userListsRef);

    const lists = docs.map((doc) => ({ ...doc.data(), docId: doc.id })) as IUserShoppingList[];

    const foundList = lists.find(({ uid }) => uid === userId);

    if (!foundList) return null;

    return foundList;
  } catch (e) {
    throw new Error(e);
  }
};

const addToShoppingList = async (userId: string, products: IProductItem[]) => {
  try {
    const userList = await getShoppingList(userId);

    if (!userList) {
      await addDoc(userListsRef, { uid: userId, products });
      return;
    }

    const updatedProductsList = aggregateProducts(userList.products, products);

    const docRef = getUserListRef(userList.docId);

    await updateDoc(docRef, { products: updatedProductsList });
  } catch (e) {
    throw new Error(e);
  }
};

const deleteShoppingList = async (id: string) => {
  try {
    const docRef = getUserListRef(id);
    await deleteDoc(docRef);
  } catch (e) {
    throw new Error(e);
  }
};

const downloadPdfFile = async (content: string) => {
  try {
    const res = await fetch('/api/pdf', { method: 'post', body: content });

    const file = await res.blob();

    const a = document.createElement('a');

    a.href = URL.createObjectURL(file);

    a.download = 'products.pdf';

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (e) {
    throw new Error(e);
  }
};

export { getRecipes, getCategories, getTags, uploadImage, addRecipe, getShoppingList, addToShoppingList, deleteShoppingList, downloadPdfFile };

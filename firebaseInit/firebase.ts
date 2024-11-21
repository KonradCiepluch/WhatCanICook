import { initializeApp } from 'firebase/app';

import { getFirestore, collection, doc } from 'firebase/firestore';

import { getAuth, FacebookAuthProvider, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

import firebaseConfig from '../firebaseConfig';

import { getStorage } from 'firebase/storage';

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

const db = getFirestore(app);

const recipesRef = collection(db, 'recipes');

const categoriesRef = collection(db, 'categories');

const tagsRef = collection(db, 'tags');

const userListsRef = collection(db, 'userShoppingList');

const blogsRef = collection(db, 'blog');

const getUserListRef = (docId: string) => doc(db, 'userShoppingList', docId);

const auth = getAuth();

const facebookProvider = new FacebookAuthProvider();

const googleProvider = new GoogleAuthProvider();

const githubProvider = new GithubAuthProvider();

export {
  recipesRef,
  categoriesRef,
  tagsRef,
  userListsRef,
  blogsRef,
  getUserListRef,
  auth,
  facebookProvider,
  googleProvider,
  githubProvider,
  storage,
};

export default app;

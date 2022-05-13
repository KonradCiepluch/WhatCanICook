import { initializeApp } from 'firebase/app';

import { getAnalytics } from 'firebase/analytics';

import { getFirestore, collection } from 'firebase/firestore';

import { getAuth, FacebookAuthProvider, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

import firebaseConfig from 'firebaseConfig';

import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase

const app = initializeApp(firebaseConfig);

// init storage

const storage = getStorage(app);

// const analytics = getAnalytics(app);

// init services

// init firestore

const db = getFirestore(app);

const recipesRef = collection(db, 'recipes');

const categoriesRef = collection(db, 'categories');

const tagsRef = collection(db, 'tags');

const auth = getAuth();

const facebookProvider = new FacebookAuthProvider();

const googleProvider = new GoogleAuthProvider();

const githubProvider = new GithubAuthProvider();

export { recipesRef, categoriesRef, tagsRef, auth, facebookProvider, googleProvider, githubProvider, storage };

export default app;

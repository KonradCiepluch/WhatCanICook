import { initializeApp } from 'firebase/app';

import { getAnalytics } from 'firebase/analytics';

import { getAuth, FacebookAuthProvider, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

import firebaseConfig from 'firebaseConfig';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase

const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);

// init services

export const auth = getAuth();

export const createUserAuth = getAuth();

export const facebookProvider = new FacebookAuthProvider();

export const googleProvider = new GoogleAuthProvider();

export const githubProvider = new GithubAuthProvider();

export default app;

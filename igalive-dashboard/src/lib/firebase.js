import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDVibO-mEIqqDGCHqo2mtnriUr1YsbDkeA",
  authDomain: "passtrack-3e434.firebaseapp.com",
  projectId: "passtrack-3e434",
  storageBucket: "passtrack-3e434.appspot.com",
  messagingSenderId: "491220286264",
  appId: "1:491220286264:web:9cf12a88695c49f72e9fcd",
  measurementId: "G-GY5N76LQCH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

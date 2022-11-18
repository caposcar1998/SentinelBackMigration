import dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

dotenv.config();

const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY || '';
const FIREBASE_AUTH_DOMAIN = process.env.FIREBASE_AUTH_DOMAIN || '';
const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID || '';
const FIREBASE_STORAGE_BUCKET = process.env.FIREBASE_STORAGE_BUCKET || '';
const FIREBASE_MESSAGING_SENDER_ID =
  process.env.FIREBASE_MESSAGING_SENDER_ID || '';
const FIREBASE_APP_ID = process.env.FIREBASE_APP_ID || '';

const FIREBASE_USER_EMAIL = process.env.FIREBASE_USER_EMAIL || '';
const FIREBASE_USER_PASSWORD = process.env.FIREBASE_USER_PASSWORD || '';

export const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);

export const auth = async () => {
  await signInWithEmailAndPassword(
    firebaseAuth,
    FIREBASE_USER_EMAIL,
    FIREBASE_USER_PASSWORD,
  ).catch((err) => console.log(err));
};

export const firestore = getFirestore(firebaseApp);

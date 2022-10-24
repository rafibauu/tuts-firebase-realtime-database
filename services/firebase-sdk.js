import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp)
export const database = getDatabase(firebaseApp)

export const defaultDatabase = getDatabase(
  firebaseApp,
  process.env.NEXT_PUBLIC_DATABASE_URL_DEFAULT
)
export const clientABCDatabase = getDatabase(
  firebaseApp,
  process.env.NEXT_PUBLIC_DATABASE_URL_CLIENT_ABC
)
export const clientBACDatabase = getDatabase(
  firebaseApp,
  process.env.NEXT_PUBLIC_DATABASE_URL_CLIENT_BAC
)

export default firebaseApp

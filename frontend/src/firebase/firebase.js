import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDdaOOykUanakAV-tAxK84cXWUuF6n-sQk",
  authDomain: "tamora1430.firebaseapp.com",
  projectId: "tamora1430",
  storageBucket: "tamora1430.firebasestorage.app",
  messagingSenderId: "751614981877",
  appId: "1:751614981877:web:6fae050f340a4714dfb7bc",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export const storage = getStorage(app);

export default app;
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { sendPasswordResetEmail } from "firebase/auth";

import { auth, db } from "../firebase/firebase";

export async function registerUser(name, email, password) {
  const userCredential =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name,
    email,
    role: "customer",
    createdAt: serverTimestamp(),
  });

  return user;
}

export async function loginUser(email, password) {
  const userCredential =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  return userCredential.user;
}

export async function logoutUser() {
  await signOut(auth);
}

export async function resetPassword(email) {
  return sendPasswordResetEmail(auth, email);
}
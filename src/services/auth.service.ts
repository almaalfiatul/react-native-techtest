import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithCredential,
  UserCredential,
  getIdToken,
} from "firebase/auth";
import * as SecureStore from "expo-secure-store";
import { auth } from "./firebase";

const TOKEN_KEY = "AUTH_TOKEN";

export const registerWithEmail = async (email: string, password: string) => {
  const cred: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
  const idToken = await cred.user.getIdToken();
  await SecureStore.setItemAsync(TOKEN_KEY, idToken);
  return { user: cred.user, token: idToken };
};

export const loginWithEmail = async (email: string, password: string) => {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  const idToken = await cred.user.getIdToken();
  await SecureStore.setItemAsync(TOKEN_KEY, idToken);
  return { user: cred.user, token: idToken };
};

export const loginWithGoogleCredential = async (idTokenFromGoogle: string) => {
  const credential = GoogleAuthProvider.credential(idTokenFromGoogle);
  const cred = await signInWithCredential(auth, credential);
  const idToken = await cred.user.getIdToken();
  await SecureStore.setItemAsync(TOKEN_KEY, idToken);
  return { user: cred.user, token: idToken };
};

export const logout = async () => {
  await signOut(auth);
  await SecureStore.deleteItemAsync(TOKEN_KEY);
};

export const getToken = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync(TOKEN_KEY);
};

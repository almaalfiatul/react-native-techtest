import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "../firebase.config";

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export const auth = getAuth();

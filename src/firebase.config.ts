import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyCC2xsXWW65g074e1e3QadRMZB_Nj0Kfmo",
  authDomain: "auth-login-67b9a.firebaseapp.com",
  projectId: "auth-login-67b9a",
  storageBucket: "auth-login-67b9a.firebasestorage.app",
  messagingSenderId: "1021590205634",
  appId: "1:1021590205634:web:7eb4c146645fb9be19375b",
  measurementId: "G-V5HZBN4N1R"
};

export const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const auth = getAuth(app);
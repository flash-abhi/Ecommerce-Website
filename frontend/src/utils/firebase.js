import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "smart-cart-4e2c8.firebaseapp.com",
  projectId: "smart-cart-4e2c8",
  storageBucket: "smart-cart-4e2c8.firebasestorage.app",
  messagingSenderId: "252166738072",
  appId: "1:252166738072:web:df1547fb546ba2726d40ed"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth,provider};
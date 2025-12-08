import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "smart-cart-1c105.firebaseapp.com",
  projectId: "smart-cart-1c105",
  storageBucket: "smart-cart-1c105.firebasestorage.app",
  messagingSenderId: "561974412490",
  appId: "1:561974412490:web:2a7b28445a7cbc020ea033"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth,provider}
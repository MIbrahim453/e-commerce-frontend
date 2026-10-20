import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ||
    "AIzaSyDSBXnWGdZ0jTZUuWgFAKZMK7RoPJemTkA",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    "e-commerce-84ad8.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "e-commerce-84ad8",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    "e-commerce-84ad8.firebasestorage.app",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "460175528683",
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID ||
    "1:460175528683:web:296b8c43e0820573da64ae",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-PE7DNG8FVP",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => signInWithPopup(auth, provider);
export default app;

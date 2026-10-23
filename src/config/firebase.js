import { initializeApp } from "firebase/app";

// Firebase configuration loaded securely from environment variables
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "sabora-spices.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "sabora-spices",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "sabora-spices.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "328447232293",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
};

// Initialize Firebase safely if API key is provided
export const app = firebaseConfig.apiKey ? initializeApp(firebaseConfig) : null;

export default app;

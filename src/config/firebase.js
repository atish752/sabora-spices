import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration (supports Vercel environment variables with fallback)
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCoDCAOp2MHWtya-ZNI8zfpdyWiRtZ_q8Y",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "sabora-spices-c6ec0.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "sabora-spices-c6ec0",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "sabora-spices-c6ec0.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "725015469626",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:725015469626:web:62490bdca5b99b0a045f03"
};

// Initialize Firebase safely (avoid duplicate app init during fast refresh)
let app = null;
let db = null;
let storage = null;

try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  db = getFirestore(app);
  storage = getStorage(app);
} catch (err) {
  console.warn("Firebase initialization warning (falling back gracefully):", err);
}

export { app, db, storage };
export default app;

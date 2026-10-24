import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// User's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBwkC2tMAUGG485mulGXYYeecpTAOxx5NE",
  authDomain: "sabora-spices.firebaseapp.com",
  projectId: "sabora-spices",
  storageBucket: "sabora-spices.firebasestorage.app",
  messagingSenderId: "328447232293",
  appId: "1:328447232293:web:6def55bcad96e6d2e072cc"
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

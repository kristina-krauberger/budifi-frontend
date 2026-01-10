import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDU3tXWBNcaCS9QYhjLqAH3-1abOvzNVU",
  authDomain: "buddyfi.firebaseapp.com",
  projectId: "buddyfi",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: "1049859680784",
  appId: "1:1049859680784:web:435f670874c8e153eff895"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
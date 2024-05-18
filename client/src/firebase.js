// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-a4f09.firebaseapp.com",
  projectId: "mern-blog-a4f09",
  storageBucket: "mern-blog-a4f09.appspot.com",
  messagingSenderId: "362627969055",
  appId: "1:362627969055:web:e8d0a98a63363f3f13252a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
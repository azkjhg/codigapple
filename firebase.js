import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// import "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnCuuVbBjyGcAh5YGlbXFmk-IMUfbGIeg",
  authDomain: "rlqja364.firebaseapp.com",
  projectId: "rlqja364",
  storageBucket: "rlqja364.appspot.com",
  messagingSenderId: "771671769096",
  appId: "1:771671769096:web:0c000f0a09cf9c1fc4d1bd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);
export const storage = getStorage(app);

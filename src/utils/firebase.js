// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCETzkKRNy5mPilxFoxKlQBG8wgTDx95Wg",
  authDomain: "moviemania-5f1c1.firebaseapp.com",
  projectId: "moviemania-5f1c1",
  storageBucket: "moviemania-5f1c1.appspot.com",
  messagingSenderId: "917672510159",
  appId: "1:917672510159:web:dabffd9d9ab485e6cc6dba",
  measurementId: "G-B57NJDT6BM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
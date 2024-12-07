// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7QTw8985F9yciXF8sVovXWRccI53uDY4",
  authDomain: "addressmanager-4b10e.firebaseapp.com",
  projectId: "addressmanager-4b10e",
  storageBucket: "addressmanager-4b10e.firebasestorage.app",
  messagingSenderId: "653993276398",
  appId: "1:653993276398:web:25c3d09ce8ad4d22cad4ff",
  measurementId: "G-VEDVHHTF7G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export { app, db, analytics };

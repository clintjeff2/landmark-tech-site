// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfWL3J4x4n6gkzUyEsi3-xla9kmCRi6y0",
  authDomain: "landmarktech.firebaseapp.com",
  projectId: "landmarktech",
  storageBucket: "landmarktech.firebasestorage.app",
  messagingSenderId: "1099391019280",
  appId: "1:1099391019280:web:4751776c11761a64139d95",
  measurementId: "G-3SJXZ073Y9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

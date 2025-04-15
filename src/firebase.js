import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB9--jSGOrwTTB9dL9AP-0aLCc8EC75eJY",
    authDomain: "e-commerce-app-with-fire-d2afa.firebaseapp.com",
    projectId: "e-commerce-app-with-fire-d2afa",
    storageBucket: "e-commerce-app-with-fire-d2afa.firebasestorage.app",
    messagingSenderId: "505029245891",
    appId: "1:505029245891:web:3ae65a7218e50105995b76",
    measurementId: "G-7MMMCTLS7W"
  };

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };

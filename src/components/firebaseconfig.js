import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAkoxzkcctyb8Y9Tc-tpxgtJ71mNqfnOw0",
    authDomain: "peppy-nation-369613.firebaseapp.com",
    projectId: "peppy-nation-369613",
    storageBucket: "peppy-nation-369613.appspot.com",
    messagingSenderId: "883060251066",
    appId: "1:883060251066:web:d452e51e3e72179a906583",
    measurementId: "G-CJY26624Y4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)

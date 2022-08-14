import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
import { getFunctions } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-functions.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBHZcOHlzvJPrHKXP6yhAxVGs8luk_dHDc",
    authDomain: "cooperider-349908.firebaseapp.com",
    projectId: "cooperider-349908",
    // storageBucket: "cooperider-349908.appspot.com",
    // messagingSenderId: "304231244018",
    appId: "1:304231244018:web:3951d44d390d35526b706b",
    measurementId: "G-DYGRWYVJQ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// make auth and firestore references
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions();
export { auth, db, functions };
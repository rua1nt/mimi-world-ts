import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCClvcC7rOqM-gFACKZvoJd2-P14jEb-iE",
    authDomain: "mimi-firebase-e9dad.firebaseapp.com",
    projectId: "mimi-firebase-e9dad",
    storageBucket: "mimi-firebase-e9dad.appspot.com",
    messagingSenderId: "16182856990",
    appId: "1:16182856990:web:4bc7e1af2b5aa2f5358d0f",
    measurementId: "G-VJDNWZ281T",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);

const firebaseAuth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export default { firebaseAuth, provider };

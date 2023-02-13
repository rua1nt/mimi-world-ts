import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCqfJk9HAopH7LAE7OJzy2HqOn7GBwFUQE",
    authDomain: "mimi-book.firebaseapp.com",
    projectId: "mimi-book",
    storageBucket: "mimi-book.appspot.com",
    messagingSenderId: "51881563705",
    appId: "1:51881563705:web:7b774e0617c01118301fe8",
    measurementId: "G-75S6SWD933",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);

const firebaseAuth = getAuth(firebaseApp);

export default firebaseAuth;

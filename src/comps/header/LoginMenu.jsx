import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import firebaseConfig from "../../firebase/firebase-config";
firebase.initializeApp(firebaseConfig);

// Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "redirect",
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: "/profile",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ],
};

export default function LoginMenu({ isSignedIn }) {
    // const [isSignedIn, setIsSignedIn] = useState(false);
    // const dispatch = useDispatch();
    // const { user } = useSelector((user) => ({ ...user }));

    useEffect(() => {
        const unregisterAuthObserver = firebase
            .auth()
            .onAuthStateChanged((user) => {
                // setIsSignedIn(!!user);

                // dispatch({ type: "LOGIN", payload: user });
                // Cookies.set("user", JSON.stringify(user));
                console.log("auth-", user);
            });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);

    if (!isSignedIn) {
        return (
            <div className="login_menu">
                <div className="login_menu_header">Welcome</div>
                <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                />
            </div>
        );
    }

    return (
        <div className="login_menu">
            <div className="login_menu_header">Sign-out</div>
            <p>Welcome, {firebase.auth().currentUser.displayName}!</p>
            <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
            {/* <p>Welcome {firebase.auth().currentUser.displayName}!</p> */}
            {/* <a onClick={() => firebase.auth().signOut()}>Sign-out</a> */}
        </div>
    );
}

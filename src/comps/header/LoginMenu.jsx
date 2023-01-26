import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Cookies from "js-cookie";
import firebaseAuth from "../../firebase/firebase-config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import {
    DiscordLoginButton,
    FacebookLoginButton,
    GoogleLoginButton,
    GithubLoginButton,
    InstagramLoginButton,
    TelegramLoginButton,
    TwitterLoginButton,
} from "react-social-login-buttons";
import { Gmail } from "../../svg";

// Configure FirebaseUI.
// const uiConfig = {
//     signInOptions: [
//         firebase.auth.EmailAuthProvider.PROVIDER_ID,
//         firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//         firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//         firebase.auth.TwitterAuthProvider.PROVIDER_ID,
//         firebase.auth.GithubAuthProvider.PROVIDER_ID,
//     ],
// };

export default function LoginMenu({ isSignedIn }) {
    const login_menu_btn = {
        height: "40px",
        fontSize: "1rem",
        marginBottom: "1rem",
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const emailSignIn = () => {
        navigate("/login");
    };

    const googleSignIn = () => {
        const authProvider = new GoogleAuthProvider();
        signInWithPopup(firebaseAuth, authProvider)
            .then((result) => {
                const data = {
                    displayName: result.user.displayName,
                    email: result.user.email,
                    phoneNumber: result.user.phoneNumber,
                    photoURL: result.user.photoURL,
                    uid: result.user.uid,
                };
                dispatch({ type: "LOGIN", payload: data });
                Cookies.set("user", JSON.stringify(data));
                toast.success(`Welcome, ${data.displayName}!`);
            })
            .catch((error) => {
                toast.error(`${error.code}: ${error.message}`);
            });
    };

    const defaultSignIn = () => {
        alert("503 Service Unavailable\n(Đang bận trông Mi năm sau làm)");
    };

    if (!isSignedIn) {
        return (
            <div className="login_menu">
                <div className="login_menu_header">Welcome</div>

                <GoogleLoginButton
                    icon={Gmail}
                    style={login_menu_btn}
                    onClick={emailSignIn}
                >
                    <span>Log in with Email</span>
                </GoogleLoginButton>

                <GoogleLoginButton
                    style={login_menu_btn}
                    onClick={googleSignIn}
                />

                <FacebookLoginButton
                    style={login_menu_btn}
                    onClick={defaultSignIn}
                />
                <InstagramLoginButton
                    style={login_menu_btn}
                    onClick={defaultSignIn}
                />
                <TwitterLoginButton
                    style={login_menu_btn}
                    onClick={defaultSignIn}
                />
                <TelegramLoginButton
                    style={login_menu_btn}
                    onClick={defaultSignIn}
                />
                <DiscordLoginButton
                    style={login_menu_btn}
                    onClick={defaultSignIn}
                />
                <GithubLoginButton
                    style={login_menu_btn}
                    onClick={defaultSignIn}
                />
            </div>
        );
    }

    return (
        <div className="login_menu">
            <div className="login_menu_header">Sign-out</div>
            {/* <p>Welcome, {firebase.auth().currentUser.displayName}!</p>
            <a onClick={() => firebase.auth().signOut()}>Sign-out</a> */}

            {/* <p>Welcome {firebase.auth().currentUser.displayName}!</p> */}
            {/* <a onClick={() => firebase.auth().signOut()}>Sign-out</a> */}
        </div>
    );
}

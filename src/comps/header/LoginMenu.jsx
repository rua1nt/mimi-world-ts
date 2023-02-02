import { useDispatch } from "react-redux";
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

const styles = {
    login_menu_btn: {
        height: "40px",
        fontSize: "1rem",
        marginBottom: "1rem",
    },
};

export default function LoginMenu({ user }) {
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
        alert(
            "503 Service Unavailable\n(Phím này để cho vui thôi, mai..mốt làm, xõa Mi ơi)"
        );
    };

    const partiallyHideEmail = (email) => {
        let elements = email.split("@");
        let prefix;
        if (elements[0].length > 3) {
            prefix =
                elements[0].substring(0, 3) +
                "*".repeat(elements[0].length - 3);
        } else {
            prefix = elements[0][0] + "*".repeat(elements[0].length - 1);
        }
        let ret = prefix + "@" + elements[1];
        return ret;
    };

    if (!user) {
        return (
            <div className="login_menu">
                <div className="login_menu_header">Welcome</div>

                <GoogleLoginButton
                    icon={Gmail}
                    style={styles.login_menu_btn}
                    onClick={emailSignIn}
                >
                    <span>Log in with Email</span>
                </GoogleLoginButton>

                <GoogleLoginButton
                    style={styles.login_menu_btn}
                    onClick={googleSignIn}
                />

                <FacebookLoginButton
                    style={styles.login_menu_btn}
                    onClick={defaultSignIn}
                />
                <InstagramLoginButton
                    style={styles.login_menu_btn}
                    onClick={defaultSignIn}
                />
                <TwitterLoginButton
                    style={styles.login_menu_btn}
                    onClick={defaultSignIn}
                />
                <TelegramLoginButton
                    style={styles.login_menu_btn}
                    onClick={defaultSignIn}
                />
                <DiscordLoginButton
                    style={styles.login_menu_btn}
                    onClick={defaultSignIn}
                />
                <GithubLoginButton
                    style={styles.login_menu_btn}
                    onClick={defaultSignIn}
                />
            </div>
        );
    }

    return (
        <div className="logout_menu">
            <div className="logout_menu_header">
                {partiallyHideEmail(user.email)}
            </div>
            <button
                className="logout_btn hvr-bounce-to-right"
                onClick={async () => await firebaseAuth.signOut()}
            >
                Log Out
            </button>
        </div>
    );
}

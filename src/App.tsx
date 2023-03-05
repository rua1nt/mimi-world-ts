import { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import Reset from "./pages/reset";
import Activate from "./pages/home/Activate";
import CreatePostPopup from "./comps/createPostPopup";
import { fsGetPosts } from "./firebase/fsPost";

import "./App.css";
// import "./firebase/firebaseui-styling.global.css";
import "react-toastify/dist/ReactToastify.css";

function reducer(state: any, action: any) {
    switch (action.type) {
        case "POSTS_REQUEST":
            return { ...state, loading: true, error: "" };
        case "POSTS_SUCCESS":
            return {
                ...state,
                loading: false,
                posts: action.payload,
                error: "",
            };
        case "POSTS_ERROR":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

function App() {
    const [visible, setVisible] = useState<boolean>(false);
    const { user } = useSelector((state: any) => ({ ...state }));

    const [{ loading, error, posts }, dispatch] = useReducer(reducer, {
        loading: false,
        posts: [],
        error: "",
    });

    // useEffect(() => {
    //     getAllPosts();
    // }, []);

    const getAllPosts = async () => {
        try {
            dispatch({
                type: "POSTS_REQUEST",
            });
            // const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getAllposts`);
            const data = fsGetPosts();
            dispatch({ type: "POSTS_SUCCESS", payload: data });
        } catch (ex: any) {
            dispatch({ type: "POSTS_ERROR", payload: ex.message });
        }
    };

    return (
        <div>
            <ToastContainer theme="colored" />

            {visible && <CreatePostPopup user={user} setVisible={setVisible} />}

            <Routes>
                <Route path="/" element={<Home setVisible={setVisible} />} />
                <Route path="/activate/:token" element={<Activate />} />

                <Route element={<LoggedInRoutes />}>
                    <Route path="/profile" element={<Profile />} />
                </Route>

                <Route element={<NotLoggedInRoutes />}>
                    <Route path="/login" element={<Login />} />
                </Route>

                <Route path="/reset" element={<Reset />} />
            </Routes>
        </div>
    );
}

export default App;

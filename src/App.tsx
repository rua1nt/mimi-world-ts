import { useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./pages/login";
import Profile from "./pages/profile";
import Home from "./pages/home";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import Activate from "./pages/home/Activate";
import Reset from "./pages/reset";
import CreatePostPopup from "./comps/createPostPopup";

import "./App.css";
import "./firebase/firebaseui-styling.global.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const [visible, setVisible] = useState<boolean>(false);
    const { user, error } = useSelector((state: any) => ({ ...state }));

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

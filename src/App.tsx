import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./pages/login";
import Profile from "./pages/profile";
import Home from "./pages/home";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";

import "./App.css";
import "./firebase/firebaseui-styling.global.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <div>
            <ToastContainer theme="colored" />
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/profile" element={<Profile />} />
                {/* <Route element={<LoggedInRoutes />}>
                </Route> */}

                <Route element={<NotLoggedInRoutes />}>
                    <Route path="/login" element={<Login />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;

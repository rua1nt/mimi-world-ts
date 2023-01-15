import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Profile from "./pages/profile";
import Home from "./pages/home";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";

import "./App.css";

function App() {
    return (
        <div>
            <Routes>
                <Route element={<LoggedInRoutes />}>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/" element={<Home />} />
                </Route>

                <Route element={<NotLoggedInRoutes />}>
                    <Route path="/login" element={<Login />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;

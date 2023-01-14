import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Profile from "./pages/profile";
import Home from "./pages/home";

import "./App.css";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    );
}

export default App;

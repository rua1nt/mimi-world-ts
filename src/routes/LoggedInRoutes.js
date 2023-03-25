import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../pages/login";

export default function LoggedInRoutes() {
    const { user } = useSelector((state) => ({ ...state }));

    return user ? <Outlet /> : <Login />;
}

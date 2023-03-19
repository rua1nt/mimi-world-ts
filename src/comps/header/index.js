import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    ArrowDown,
    Friends,
    Gaming,
    Home,
    HomeActive,
    FbLogo,
    Market,
    Menu,
    Messenger,
    Notifications,
    Search,
    Watch,
    UserFocus,
} from "../../svg";

import LoginMenu from "./LoginMenu";
import SearchMenu from "./SearchMenu";
import AllMenu from "./AllMenu";
import UserMenu from "./userMenu";
import useClickOutside from "../../helpers/clickOutside";
import "./style.css";

export default function Header({ page }) {
    const color_secondary = "#65676b";
    const { user } = useSelector((state) => ({ ...state }));

    const [showLoginMenu, setShowLoginMenu] = useState(false);
    const [showSearchMenu, setShowSearchMenu] = useState(false);
    const [showAllMenu, setShowAllMenu] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const loginMenu = useRef(null);
    const allmenu = useRef(null);
    const usermenu = useRef(null);

    useClickOutside(loginMenu, () => {
        setShowLoginMenu(false);
    });

    useClickOutside(allmenu, () => {
        setShowAllMenu(false);
    });

    useClickOutside(usermenu, () => {
        setShowUserMenu(false);
    });

    return (
        <header>
            <div className="header_left">
                {/* <Link to="/" className="header_logo">
                    <div className="circle">
                        <FbLogo />
                    </div>
                </Link> */}
                <div className="circle" ref={loginMenu}>
                    <div
                        className="circle_icon-center"
                        onClick={() => {
                            setShowLoginMenu((prev) => !prev);
                        }}
                    >
                        {user ? (
                            <img className="header_profile_img" src={user.photoURL} alt="" />
                        ) : (
                            <UserFocus className={"ping"} color={"#1b74e4"} />
                        )}
                    </div>
                    {showLoginMenu && <LoginMenu user={user} setShowLoginMenu={setShowLoginMenu} />}
                </div>

                <div
                    className="search search1"
                    onClick={() => {
                        setShowSearchMenu(true);
                    }}
                >
                    <Search color={color_secondary} />
                    <input type="text" placeholder="Search mimi..." className="hide_input" />
                </div>
            </div>
            {showSearchMenu && (
                <SearchMenu color={color_secondary} setShowSearchMenu={setShowSearchMenu} />
            )}

            <div className="header_middle">
                <Link to="/" className={`middle_icon ${page === "home" ? "active" : "hover1"}`}>
                    {page === "home" ? <HomeActive /> : <Home color={color_secondary} />}
                </Link>
                <Link to="/" className="middle_icon hover1">
                    <Friends color={color_secondary} />
                    <div className="middle_notification">9+</div>
                </Link>
                <Link to="/" className="middle_icon hover1">
                    <Watch color={color_secondary} />
                    <div className="middle_notification">9+</div>
                </Link>
                <Link to="/" className="middle_icon hover1">
                    <Market color={color_secondary} />
                </Link>
                <Link to="/" className="middle_icon hover1">
                    <Gaming color={color_secondary} />
                </Link>
            </div>

            <div className="header_right">
                {/* <Link
                    to="/profile"
                    className={`profile_link hover1 ${page === "profile" ? "active_link" : ""}`}
                >
                    <img src={user?.photoURL} alt="" />
                    <span>{user?.displayName}</span>
                </Link> */}

                <div className="circle_icon hover9" ref={allmenu}>
                    <div
                        className="circle_icon-center"
                        onClick={() => {
                            setShowAllMenu((prev) => !prev);
                        }}
                    >
                        <Menu />
                    </div>
                    {showAllMenu && <AllMenu />}
                </div>

                <div className="circle_icon hover9">
                    <Messenger />
                    <div className="right_notification">9+</div>
                </div>
                <div className="circle_icon hover9">
                    <Notifications />
                    <div className="right_notification">9+</div>
                </div>

                <div className="circle_icon hover9" ref={usermenu}>
                    <div
                        className="circle_icon-center"
                        onClick={() => {
                            setShowUserMenu((prev) => !prev);
                        }}
                    >
                        <ArrowDown />
                    </div>
                    {showUserMenu && <UserMenu user={user} />}
                </div>
            </div>
        </header>
    );
}

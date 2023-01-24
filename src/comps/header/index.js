import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    ArrowDown,
    Friends,
    Gaming,
    HomeActive,
    Logo,
    Market,
    Menu,
    Messenger,
    Notifications,
    Search,
    Watch,
} from "../../svg";

import LoginMenu from "./LoginMenu";
import SearchMenu from "./SearchMenu";
import AllMenu from "./AllMenu";
import UserMenu from "./userMenu";
import useClickOutside from "../../helpers/clickOutside";
import "./style.css";

export default function Header() {
    const color_secondary = "#65676b";
    const { user } = useSelector((user) => ({ ...user }));

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
                        <Logo />
                    </div>
                </Link> */}
                <div className="circle" ref={loginMenu}>
                    <div
                        className="circle_icon-center"
                        onClick={() => {
                            setShowLoginMenu((prev) => !prev);
                        }}
                    >
                        <Logo />
                    </div>
                    {showLoginMenu && (
                        <LoginMenu isSignedIn={user ? true : false} />
                    )}
                </div>

                <div
                    className="search search1"
                    onClick={() => {
                        setShowSearchMenu(true);
                    }}
                >
                    <Search color={color_secondary} />
                    <input
                        type="text"
                        placeholder="Search mimi..."
                        className="hide_input"
                    />
                </div>
            </div>
            {showSearchMenu && (
                <SearchMenu
                    color={color_secondary}
                    setShowSearchMenu={setShowSearchMenu}
                />
            )}

            <div className="header_middle">
                <Link to="/" className="middle_icon active">
                    <HomeActive />
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
                <Link to="/profile" className="profile_link hover1">
                    <img src={user?.picture} alt="" />
                    <span>{user?.first_name || "Mimi"}</span>
                </Link>

                <div className="circle_icon hover1" ref={allmenu}>
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

                <div className="circle_icon hover1">
                    <Messenger />
                    <div className="right_notification">9+</div>
                </div>
                <div className="circle_icon hover1">
                    <Notifications />
                    <div className="right_notification">9+</div>
                </div>

                <div className="circle_icon hover1" ref={usermenu}>
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

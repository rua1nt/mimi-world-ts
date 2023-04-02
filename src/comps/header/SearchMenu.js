import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Return, Search } from "../../svg";
import useClickOutside from "../../helpers/clickOutside";
// import {
//     addToSearchHistory,
//     getSearchHistory,
//     removeFromSearch,
//     search,
// } from "../../functions/userProfile";

export default function SearchMenu({ color, setShowSearchMenu }) {
    const [iconVisible, setIconVisible] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);
    const menu = useRef(null);
    const input = useRef(null);

    useClickOutside(menu, () => {
        setShowSearchMenu(false);
    });

    useEffect(() => {
        getHistory();
    }, []);

    useEffect(() => {
        input.current.focus();
    }, []);

    const getHistory = async () => {
        // const res = await getSearchHistory(token);
        const res = [
            {
                uid: "user.uid1",
                user_photoURL: "../../../images/default_pic.png",
                user_displayName: "fake_history",
                createdAt: new Date(),
            },
        ];
        setSearchHistory(res);
    };

    const searchHandler = async () => {
        if (searchTerm === "") {
            setResults("");
        } else {
            // const res = await search(searchTerm, token);
            const res = [
                {
                    uid: "user.uid1",
                    user_photoURL: "../../../images/default_pic.png",
                    user_displayName: "fake_searching",
                    createdAt: new Date(),
                },
            ];
            setResults(res);
        }
    };

    const addToSearchHistoryHandler = async (searchUser) => {
        // const res = await addToSearchHistory(searchUser, token);
        getHistory();
    };

    const handleRemove = async (searchUser) => {
        // removeFromSearch(searchUser, token);
        getHistory();
    };

    return (
        <div className="header_left search_area scrollbar" ref={menu}>
            <div className="search_wrap">
                <div className="header_logo">
                    <div
                        className="circle hover1"
                        onClick={() => {
                            setShowSearchMenu(false);
                        }}
                    >
                        <Return color={color} />
                    </div>
                </div>
                <div className="search" onClick={() => input.current.focus()}>
                    {iconVisible && (
                        <div>
                            <Search color={color} />
                        </div>
                    )}
                    <input
                        type="text"
                        placeholder="Search mimi..."
                        ref={input}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyUp={searchHandler}
                        onFocus={() => setIconVisible(false)}
                        onBlur={() => setIconVisible(true)}
                    />
                </div>
            </div>
            {results === "" && (
                <div className="search_history_header">
                    <span>Recent searches</span>
                    <a href="/#">Edit</a>
                </div>
            )}
            <div className="search_history scrollbar">
                {searchHistory &&
                    results === "" &&
                    searchHistory
                        .sort((a, b) => {
                            return new Date(b.createdAt) - new Date(a.createdAt);
                        })
                        .map((user, i) => (
                            <div className="search_user_item hover1" key={i}>
                                <Link
                                    className="flex"
                                    to={`/profile/${user.uid}`}
                                    onClick={() => addToSearchHistoryHandler(user.uid)}
                                >
                                    <img src={user.user_photoURL} alt="" />
                                    <span>{user.user_displayName}</span>
                                </Link>
                                <i
                                    className="exit_icon"
                                    onClick={() => {
                                        handleRemove(user.uid);
                                    }}
                                ></i>
                            </div>
                        ))}
            </div>
            <div className="search_results scrollbar">
                {results &&
                    results.map((user, i) => (
                        <Link
                            to={`/profile/${user.user_displayName}`}
                            className="search_user_item hover1"
                            onClick={() => addToSearchHistoryHandler(user.uid)}
                            key={i}
                        >
                            <img src={user.user_photoURL} alt="" />
                            <span>{user.user_displayName}</span>
                        </Link>
                    ))}
            </div>
        </div>
    );
}

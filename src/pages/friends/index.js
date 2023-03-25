import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Card from "./Card";
import Header from "../../comps/header";
import { friendspage } from "../../functions/reducers";
import { getFriendsPageInfos } from "../../functions/userProfile";
import "./style.css";

export default function Friends() {
    const { user } = useSelector((state) => ({ ...state }));
    const { type } = useParams();

    const [{ loading, error, data }, dispatch] = useReducer(friendspage, {
        loading: false,
        data: {},
        error: "",
    });

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        dispatch({ type: "FRIENDS_REQUEST" });
        // const res = await getFriendsPageInfos(user.token);
        const res = {
            status: "ok",
            data: {
                friends: [
                    {
                        uid: "user.uid1",
                        user_photoURL: "../../../images/default_pic.png",
                        user_displayName: "fake_friend-1",
                    },
                ],
                requests: [
                    {
                        uid: "user.uid1",
                        user_photoURL: "../../../images/default_pic.png",
                        user_displayName: "fake_request-1",
                    },
                ],
                sentRequests: [
                    {
                        uid: "user.uid1",
                        user_photoURL: "../../../images/default_pic.png",
                        user_displayName: "fake_sentRequest-1",
                    },
                ],
            },
        };
        if (res.status === "ok") {
            dispatch({ type: "FRIENDS_SUCCESS", payload: res.data });
        } else {
            dispatch({ type: "FRIENDS_ERROR", payload: res.data });
        }
    };

    return (
        <>
            <Header page="friends" />
            <div className="friends">
                <div className="friends_left">
                    <div className="friends_left_header">
                        <h3>Friends</h3>
                        <div className="small_circle">
                            <i className="settings_filled_icon"></i>
                        </div>
                    </div>
                    <div className="friends_left_wrap">
                        <Link
                            to="/friends"
                            className={`mmenu_item hover3 ${type === undefined && "active_friends"}`}
                        >
                            <div className="small_circle">
                                <i className="friends_home_icon "></i>
                            </div>
                            <span>Home</span>
                            <div className="rArrow">
                                <i className="right_icon"></i>
                            </div>
                        </Link>
                        <Link
                            to="/friends/requests"
                            className={`mmenu_item hover3 ${
                                type === "requests" && "active_friends"
                            }`}
                        >
                            <div className="small_circle">
                                <i className="friends_requests_icon"></i>
                            </div>
                            <span>Friend Requests</span>
                            <div className="rArrow">
                                <i className="right_icon"></i>
                            </div>
                        </Link>
                        <Link
                            to="/friends/sent"
                            className={`mmenu_item hover3 ${type === "sent" && "active_friends"}`}
                        >
                            <div className="small_circle">
                                <i className="friends_requests_icon"></i>
                            </div>
                            <span>Sent Requests</span>
                            <div className="rArrow">
                                <i className="right_icon"></i>
                            </div>
                        </Link>
                        <div className="mmenu_item hover3">
                            <div className="small_circle">
                                <i className="friends_suggestions_icon"></i>
                            </div>
                            <span>Suggestions</span>
                            <div className="rArrow">
                                <i className="right_icon"></i>
                            </div>
                        </div>
                        <Link
                            to="/friends/all"
                            className={`mmenu_item hover3 ${type === "all" && "active_friends"}`}
                        >
                            <div className="small_circle">
                                <i className="all_friends_icon"></i>
                            </div>
                            <span>All Friends</span>
                            <div className="rArrow">
                                <i className="right_icon"></i>
                            </div>
                        </Link>
                        <div className="mmenu_item hover3">
                            <div className="small_circle">
                                <i className="birthdays_icon"></i>
                            </div>
                            <span>Birthdays</span>
                            <div className="rArrow">
                                <i className="right_icon"></i>
                            </div>
                        </div>
                        <div className="mmenu_item hover3">
                            <div className="small_circle">
                                <i className="all_friends_icon"></i>
                            </div>
                            <span>Custom Lists</span>
                            <div className="rArrow">
                                <i className="right_icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="friends_right">
                    {(type === undefined || type === "requests") && (
                        <div className="friends_right_wrap">
                            <div className="friends_left_header">
                                <h3>Friend Requests</h3>
                                {type === undefined && (
                                    <Link to="/friends/requests" className="see_link hover3">
                                        See all
                                    </Link>
                                )}
                            </div>
                            <div className="flex_wrap">
                                {data.requests &&
                                    data.requests.map((user) => (
                                        <Card
                                            userr={user}
                                            key={user.uid}
                                            type="request"
                                            getData={getData}
                                        />
                                    ))}
                            </div>
                        </div>
                    )}
                    {(type === undefined || type === "sent") && (
                        <div className="friends_right_wrap">
                            <div className="friends_left_header">
                                <h3>Sent Requests</h3>
                                {type === undefined && (
                                    <Link to="/friends/sent" className="see_link hover3">
                                        See all
                                    </Link>
                                )}
                            </div>
                            <div className="flex_wrap">
                                {data.sentRequests &&
                                    data.sentRequests.map((user) => (
                                        <Card
                                            userr={user}
                                            key={user.uid}
                                            type="sent"
                                            getData={getData}
                                        />
                                    ))}
                            </div>
                        </div>
                    )}
                    {(type === undefined || type === "all") && (
                        <div className="friends_right_wrap">
                            <div className="friends_left_header">
                                <h3>Friends</h3>
                                {type === undefined && (
                                    <Link to="/friends/all" className="see_link hover3">
                                        See all
                                    </Link>
                                )}
                            </div>
                            <div className="flex_wrap">
                                {data.friends &&
                                    data.friends.map((user) => (
                                        <Card
                                            userr={user}
                                            key={user.uid}
                                            type="friends"
                                            getData={getData}
                                        />
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

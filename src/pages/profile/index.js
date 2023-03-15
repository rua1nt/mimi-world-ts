import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Cover from "./Cover";
import ProfileMenu from "./ProfileMenu";
import ProfielPictureInfos from "./ProfielPictureInfos";
import GridPosts from "./GridPosts";
import PplYouMayKnow from "./PplYouMayKnow";
import Photos from "./Photos";
import Friends from "./Friends";

import Header from "../../comps/header";
import Post from "../../comps/post";
import CreatePost from "../../comps/createPost";
import { profileReducer } from "../../functions/reducers";
import "./style.css";

export default function Profile({ setVisible }) {
    const navigate = useNavigate();
    const { user } = useSelector((state) => ({ ...state }));
    const { uid } = useParams();

    let username = uid === undefined ? user.uid : uid;
    let visitor = username === user.uid ? false : true;

    const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
        loading: false,
        profile: {
            cover: "https://live.staticflickr.com/7060/7017605661_c54d719cec_c.jpg",
            posts: [
                {
                    _id: 1,
                    user_displayName: "Fake Mimi",
                    user_photoURL: "../../../images/default_pic.png",
                    background: "../../../images/postbackgrounds/2.jpg",
                    text: "fake post",
                    // created_at: new Date(),
                },
            ],
        },
        error: "",
    });

    useEffect(() => {
        getProfile();
    }, [username]);

    const getProfile = async () => {
        try {
            dispatch({ type: "PROFILE_REQUEST" });
            const { data } = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/getProfile/${username}`,
                {
                    headers: { Authorization: `Bearer ${user.token}` },
                }
            );
            if (data.ok === false) {
                navigate("/profile");
            } else {
                dispatch({ type: "PROFILE_SUCCESS", payload: data });
            }
        } catch (ex) {
            dispatch({ type: "PROFILE_ERROR", payload: ex.message });
        }
    };

    return (
        <div className="profile">
            <Header page="profile" />
            <div className="profile_top">
                <div className="profile_container">
                    <Cover cover={profile.cover} visitor={visitor} />
                    <ProfielPictureInfos profile={profile} visitor={visitor} />
                    <ProfileMenu />
                </div>
            </div>

            <div className="profile_bottom">
                <div className="profile_container">
                    <div className="bottom_container">
                        <PplYouMayKnow />
                        <div className="profile_grid">
                            <div className="profile_left">
                                <Photos username={username} token={user.token} />
                                <Friends friends={profile.friends} />
                                <div className="relative_fb_copyright">
                                    <Link to="/">Privacy </Link>
                                    <span>. </span>
                                    <Link to="/">Terms </Link>
                                    <span>. </span>
                                    <Link to="/">Advertising </Link>
                                    <span>. </span>
                                    <Link to="/">
                                        Ad Choices <i className="ad_choices_icon"></i>{" "}
                                    </Link>
                                    <span>. </span>
                                    <Link to="/"></Link>Cookies <span>. </span>
                                    <Link to="/">More </Link>
                                    <span>. </span> <br />
                                    Meta � 2022
                                </div>
                            </div>

                            <div className="profile_right">
                                {!visitor && (
                                    <CreatePost user={user} profile setVisible={setVisible} />
                                )}
                                <GridPosts />
                                <div className="posts">
                                    {profile.posts?.length ? (
                                        profile.posts.map((post) => (
                                            <Post post={post} user={user} key={post._id} profile />
                                        ))
                                    ) : (
                                        <div className="no_posts">No posts available</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

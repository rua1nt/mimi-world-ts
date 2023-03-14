import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Cover from "./Cover";
import ProfileMenu from "./ProfileMenu";
import ProfielPictureInfos from "./ProfielPictureInfos";
import GridPosts from "./GridPosts";
import PplYouMayKnow from "./PplYouMayKnow";

import Header from "../../comps/header";
import Post from "../../comps/post";
import CreatePost from "../../comps/createPost";
import { profileReducer } from "../../functions/reducers";
import "./style.css";

export default function Profile({ setVisible }) {
    const navigate = useNavigate();
    const { user } = useSelector((state) => ({ ...state }));
    const { uid } = useParams();

    let userName = uid === undefined ? user.uid : uid;
    let visitor = userName === user.uid ? false : true;

    const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
        loading: false,
        profile: {
            cover: "https://live.staticflickr.com/7060/7017605661_c54d719cec_c.jpg",
        },
        error: "",
    });

    useEffect(() => {
        getProfile();
    }, [userName]);

    const getProfile = async () => {
        try {
            dispatch({ type: "PROFILE_REQUEST" });
            const { data } = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/getProfile/${userName}`,
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
                            <div className="profile_left"></div>
                            <div className="profile_right">
                                {!visitor && (
                                    <CreatePost user={user} profile setVisible={setVisible} />
                                )}
                                <GridPosts />
                                <div className="posts">
                                    {profile.posts?.length ? (
                                        profile.posts.map((post) => (
                                            <Post post={post} user={user} key={post._id} />
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

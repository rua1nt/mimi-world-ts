import axios from "axios";
import { useEffect, useReducer, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
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
import Intro from "../../comps/intro";
import CreatePost from "../../comps/createPost";
import { profileReducer } from "../../functions/reducers";
import "./style.css";

export default function Profile({ setVisible }) {
    const { user } = useSelector((state) => ({ ...state }));
    const { uid } = useParams();
    const navigate = useNavigate();
    const [photos, setPhotos] = useState({});
    const [othername, setOthername] = useState();

    let username = uid === undefined ? user.uid : uid;
    let visitor = username === user.uid ? false : true;

    const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
        loading: false,
        profile: {
            cover: "https://live.staticflickr.com/7060/7017605661_c54d719cec_c.jpg",
            picture: user.photoURL,
            displayName: user.displayName,
            first_name: "first_name",
            last_name: "last_name",
            details: {
                otherName: "#",
            },
            posts: [
                {
                    _id: 1,
                    user_photoURL: user.photoURL,
                    user_displayName: user.displayName,
                    background: "../../../images/postbackgrounds/2.jpg",
                    text: "fake post",
                    // created_at: new Date(),
                },
            ],
            friends: [
                { _id: 1, photoURL: "../../../images/default_pic.png" },
                { _id: 2, photoURL: "../../../images/default_pic.png" },
            ],
        },
        error: "",
    });

    useEffect(() => {
        getProfile();
    }, [username]);

    useEffect(() => {
        setOthername(profile?.details?.otherName);
    }, [profile]);

    const max = 30;
    const sort = "desc";
    const path = `${username}/*`;
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
                const images = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/listImages`,
                    { path, sort, max },
                    {
                        headers: { Authorization: `Bearer ${user.token}` },
                    }
                );
                setPhotos(images.data);
                dispatch({ type: "PROFILE_SUCCESS", payload: data });
            }
        } catch (ex) {
            dispatch({ type: "PROFILE_ERROR", payload: ex.message });
            // set initial state when FAILED - rua1hc
            setPhotos({
                total_count: 1,
                resources: [
                    {
                        folder: "undefined/profile_pictures",
                        public_id: 1,
                        secure_url: user.photoURL,
                    },
                    {
                        folder: `${user.uid}/profile_pictures`,
                        public_id: 2,
                        secure_url: user.photoURL,
                    },
                ],
            });
        }
    };

    const profileTop = useRef(null);
    const leftSide = useRef(null);
    const [height, setHeight] = useState();
    const [leftHeight, setLeftHeight] = useState();
    const [scrollHeight, setScrollHeight] = useState();

    useEffect(() => {
        setHeight(profileTop.current.clientHeight + 300);
        setLeftHeight(leftSide.current.clientHeight);
        window.addEventListener("scroll", getScroll, { passive: true });
        return () => {
            window.addEventListener("scroll", getScroll, { passive: true });
        };
    }, [loading, scrollHeight]);

    const check = useMediaQuery({
        query: "(min-width:901px)",
    });

    const getScroll = () => {
        setScrollHeight(window.pageYOffset);
    };

    return (
        <div className="profile">
            <Header page="profile" />
            <div className="profile_top" ref={profileTop}>
                <div className="profile_container">
                    <Cover cover={profile.cover} visitor={visitor} />
                    <ProfielPictureInfos
                        profile={profile}
                        visitor={visitor}
                        photos={photos.resources}
                        othername={othername}
                    />
                    <ProfileMenu />
                </div>
            </div>

            <div className="profile_bottom">
                <div className="profile_container">
                    <div className="bottom_container">
                        <PplYouMayKnow />

                        <div
                            className={`profile_grid ${
                                check && scrollHeight >= height && leftHeight > 1000
                                    ? "scrollFixed showLess"
                                    : check &&
                                      scrollHeight >= height &&
                                      leftHeight < 1000 &&
                                      "scrollFixed showMore"
                            }`}
                        >
                            <div className="profile_left" ref={leftSide}>
                                <Intro
                                    detailss={profile.details}
                                    visitor={visitor}
                                    setOthername={setOthername}
                                />
                                <Photos username={username} token={user.token} photos={photos} />
                                <Friends friends={profile.friends} />
                                <div className="relative_fb_copyright">
                                    <Link to="/">Privacy</Link>
                                    <span> . </span>
                                    <Link to="/">Terms</Link>
                                    <span> . </span>
                                    <Link to="/">Advertising</Link>
                                    <span> . </span>
                                    <Link to="/">
                                        <span>Ad Choices </span>
                                        <i className="ad_choices_icon"></i>
                                    </Link>
                                    <span> . </span>
                                    <Link to="/">Cookies</Link>
                                    <span> . </span>
                                    <Link to="/">More</Link>
                                    <span> . Mimi © 2023</span>
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

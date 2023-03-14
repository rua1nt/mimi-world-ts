import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Cover from "./Cover";
import ProfileMenu from "./ProfileMenu";
import ProfielPictureInfos from "./ProfielPictureInfos";
import PplYouMayKnow from "./PplYouMayKnow";
import Header from "../../comps/header";
import { profileReducer } from "../../functions/reducers";
import "./style.css";

export default function Profile() {
    const navigate = useNavigate();
    const { user } = useSelector((state) => ({ ...state }));
    const { uid } = useParams();

    var userName = uid === undefined ? user.uid : uid;

    const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
        loading: false,
        profile: {
            cover: "https://wallpaperstock.net/funny-cartoon-wallpapers_55168_852x480.jpg",
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
                    <Cover cover={profile.cover} />
                    <ProfielPictureInfos profile={profile} />
                    <ProfileMenu />
                </div>
            </div>
            
      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            <PplYouMayKnow />
          </div>
        </div>
      </div>
        </div>
    );
}

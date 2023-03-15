import axios from "axios";
import { useEffect, useReducer } from "react";
import { photosReducer } from "../../functions/reducers";

export default function Photos({ username, token }) {
    const [{ loading, error, photos }, dispatch] = useReducer(photosReducer, {
        loading: false,
        photos: {
            total_count: 1,
            resources: [
                {
                    public_id: 1,
                    secure_url: "../../../stories/profile1.jpg",
                },
            ],
        },
        error: "",
    });

    useEffect(() => {
        getPhotos();
    }, [username]);

    const path = `${username}/*`;
    const sort = "desc";
    const max = 30;

    const getPhotos = async () => {
        try {
            dispatch({ type: "PHOTOS_REQUEST" });
            const { data } = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/listImages`,
                { path, sort, max },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            dispatch({ type: "PHOTOS_SUCCESS", payload: data });
        } catch (ex) {
            dispatch({ type: "PHOTOS_ERROR", payload: ex.message });
        }
    };
    console.log("photos", photos);

    return (
        <div className="profile_card">
            <div className="profile_card_header">
                Photos
                <div className="profile_header_link">See all photos</div>
            </div>
            <div className="profile_card_count">
                {photos.total_count === 0
                    ? ""
                    : photos.total_count === 1
                    ? "1 Photo"
                    : `${photos.total_count} photos`}
            </div>
            <div className="profile_card_grid">
                {photos.resources &&
                    photos.resources.slice(0, 9).map((img) => (
                        <div className="profile_photo_card" key={img.public_id}>
                            <img src={img.secure_url} alt="" />
                        </div>
                    ))}
            </div>
        </div>
    );
}

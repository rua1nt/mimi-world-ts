import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import ImagePreview from "./ImagePreview";
import EmojiPickerBackgrounds from "./EmojiPickerBackgrounds";
import PostError from "./PostError";
import AddToYourPost from "./AddToYourPost";
import dataURItoBlob from "../../helpers/dataURItoBlob";
import useClickOutside from "../../helpers/clickOutside";
import { createPost } from "../../functions/createPost";
import { uploadImages } from "../../functions/uploadImages";
import "./style.css";

export default function CreatePostPopup({ user, setVisible }) {
    const popup = useRef(null);
    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const [showPrev, setShowPrev] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [images, setImages] = useState([]);
    const [background, setBackground] = useState("");

    useClickOutside(popup, () => {
        setVisible(false);
    });

    const postSubmit = async () => {
        if (!user) {
            setError("💩Log in đi má🧻");
            return;
        }
        if (background) {
            setLoading(true);
            const response = await createPost(
                null,
                background,
                text,
                null,
                user.id,
                user.token
            );
            setLoading(false);
            if (response === "ok") {
                setBackground("");
                setText("");
                setVisible(false);
            } else {
                setError(response);
            }
        } else if (images && images.length) {
            setLoading(true);
            const postImages = images.map((img) => {
                return dataURItoBlob(img);
            });
            const path = `${user.username}/postImages`;
            let formData = new FormData();
            formData.append("path", path);
            postImages.forEach((image) => {
                formData.append("file", image);
            });
            const response = await uploadImages(formData, path, user.token);
            const res = await createPost(
                null,
                null,
                text,
                response,
                user.id,
                user.token
            );
            setLoading(false);
            if (res === "ok") {
                setText("");
                setImages("");
                setVisible(false);
            } else {
                setError(res);
            }
        } else if (text) {
            setLoading(true);
            const response = await createPost(
                null,
                null,
                text,
                null,
                user.id,
                user.token
            );
            setLoading(false);
            if (response === "ok") {
                setBackground("");
                setText("");
                setVisible(false);
            } else {
                setError(response);
            }
        } else {
            console.log("nothing");
        }
    };

    return (
        <div className="blur">
            <div className="postBox" ref={popup}>
                {error && <PostError error={error} setError={setError} />}
                <div className="box_header">
                    <div
                        className="small_circle"
                        onClick={() => setVisible(false)}
                    >
                        <i className="exit_icon"></i>
                    </div>
                    <span>Create Post</span>
                </div>

                <div className="box_profile">
                    <img
                        src={
                            user?.photoURL || "../../../images/default_pic.png"
                        }
                        alt=""
                        className="box_profile_img"
                    />
                    <div className="box_col">
                        <div className="box_profile_name">
                            {user?.displayName || "Mimi - Đi Đu Đưa Đi!"}
                        </div>
                        <div className="box_privacy">
                            <img src="../../../icons/public.png" alt="" />
                            <span>Public</span>
                            <i className="arrowDown_icon"></i>
                        </div>
                    </div>
                </div>

                {!showPrev ? (
                    <EmojiPickerBackgrounds
                        text={text}
                        user={user}
                        setText={setText}
                        // showPrev={showPrev}
                        setBackground={setBackground}
                        background={background}
                    />
                ) : (
                    <ImagePreview
                        text={text}
                        user={user}
                        setText={setText}
                        // showPrev={showPrev}
                        images={images}
                        setImages={setImages}
                        setShowPrev={setShowPrev}
                        setError={setError}
                    />
                )}

                <AddToYourPost setShowPrev={setShowPrev} />
                <button
                    className="post_submit"
                    onClick={() => postSubmit()}
                    disabled={loading}
                >
                    {loading ? <PulseLoader color="#fff" size={5} /> : "Post"}
                </button>
            </div>
        </div>
    );
}

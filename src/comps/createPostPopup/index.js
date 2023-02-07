import { useRef, useState } from "react";
import EmojiPickerBackgrounds from "./EmojiPickerBackgrounds";
import AddToYourPost from "./AddToYourPost";
import "./style.css";

export default function CreatePostPopup({ user }) {
    const [text, setText] = useState("");
    const [showPrev, setShowPrev] = useState(false);
    const textRef = useRef(null);

    return (
        <div className="blur">
            <div className="postBox">
                <div className="box_header">
                    <div className="small_circle">
                        <i className="exit_icon"></i>
                    </div>
                    <span>Create Post</span>
                </div>

                <div className="box_profile">
                    <img
                        src={user.photoURL}
                        alt=""
                        className="box_profile_img"
                    />
                    <div className="box_col">
                        <div className="box_profile_name">
                            {user.displayName}
                        </div>
                        <div className="box_privacy">
                            <img src="../../../icons/public.png" alt="" />
                            <span>Public</span>
                            <i className="arrowDown_icon"></i>
                        </div>
                    </div>
                </div>

                {!showPrev && (
                    <div>
                        <div className="flex_center">
                            <textarea
                                ref={textRef}
                                maxLength="100"
                                value={text}
                                placeholder={`What's on your mind, ${user.displayName}?`}
                                className="post_input"
                                onChange={(e) => setText(e.target.value)}
                            ></textarea>
                        </div>
                        <EmojiPickerBackgrounds
                            text={text}
                            textRef={textRef}
                            setText={setText}
                        />
                    </div>
                )}

                <AddToYourPost />
                <button className="post_submit">Post</button>
            </div>
        </div>
    );
}

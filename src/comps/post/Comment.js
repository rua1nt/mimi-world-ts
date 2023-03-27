import { useState } from "react";
import Moment from "react-moment";
import { Dots } from "../../svg";
import { fsDeleteComment } from "../../firebase/fsPost";

export default function Comment({ postId, comment }) {
    const [error, setError] = useState("");

    const handleDeleteComment = async () => {
        const response = await fsDeleteComment(postId, comment);
        if (response.status === "OK") {
            setError("");
        } else {
            setError(`Cannot delete comment (${response})`);
        }
    };

    return (
        <div className="comment">
            <img src={comment.user_photoURL} alt="" className="comment_img" />
            <div className="comment_col">
                <div className="comment_wrap">
                    <div className="comment_name">{comment.user_displayName}</div>
                    <div className="comment_text">{comment.text}</div>
                </div>
                {comment.image && <img src={comment.image} alt="" className="comment_image" />}
                <div className="comment_actions">
                    <span>Like</span>
                    <span>Reply</span>
                    <span onClick={handleDeleteComment}>Delete</span>
                    <span>
                        <Moment fromNow interval={30}>
                            {comment.created_at.toDate()}
                        </Moment>
                    </span>
                    {error && (
                        <div className="postError comment_error">
                            <div className="postError_error">{error}</div>
                            <button className="blue_btn" onClick={() => setError("")}>
                                Try again
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="comment_menu hover1" onClick={() => console.log("first")}>
                <Dots color="#828387" />
            </div>
        </div>
    );
}

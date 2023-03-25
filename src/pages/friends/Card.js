import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { acceptRequest, cancelRequest, deleteRequest } from "../../functions/userProfile";

export default function Card({ userr, type, getData }) {
    const { user } = useSelector((state) => ({ ...state }));
    const cancelRequestHandler = async (userId) => {
        // const res = await cancelRequest(userId, user.token);
        const res = "ok";
        if (res == "ok") {
            getData();
        }
    };
    const confirmHandler = async (userId) => {
        // const res = await acceptRequest(userId, user.token);
        const res = "ok";
        if (res == "ok") {
            getData();
        }
    };
    const deleteHandler = async (userId) => {
        // const res = await deleteRequest(userId, user.token);
        const res = "ok";
        if (res == "ok") {
            getData();
        }
    };
    return (
        <div className="req_card">
            <Link to={`/profile/${userr.user_displayName}`}>
                <img src={userr.user_photoURL} alt="" />
            </Link>
            <div className="req_name">{userr.user_displayName}</div>
            {type === "sent" ? (
                <button className="blue_btn" onClick={() => cancelRequestHandler(userr.uid)}>
                    Cancel Request
                </button>
            ) : type === "request" ? (
                <>
                    <button className="blue_btn" onClick={() => confirmHandler(userr.uid)}>
                        Confirm
                    </button>
                    <button className="gray_btn" onClick={() => deleteHandler(userr.uid)}>
                        Delete
                    </button>
                </>
            ) : (
                ""
            )}
        </div>
    );
}

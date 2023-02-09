import { Feeling, LiveVideo, Photo } from "../../svg";
// import UserMenu from "../header/userMenu";
import "./style.css";

export default function CreatePost({ user, setVisible }) {
    return (
        <div className="createPost">
            <div className="createPost_header">
                <img
                    src={user?.photoURL || "../../../images/default_pic.png"}
                    alt=""
                />
                <div
                    className="open_post hover2"
                    onClick={() => setVisible(true)}
                >
                    {user
                        ? `Đi Đu Đưa Ko, ${user.displayName}?`
                        : "Đi Đu Đưa Ko, Mimi?"}
                </div>
            </div>
            <div className="create_splitter"></div>

            <div className="createPost_body">
                <div className="createPost_icon hover1">
                    <LiveVideo color="#f3425f" />
                    Live Video
                </div>
                <div className="createPost_icon hover1">
                    <Photo color="#4bbf67" />
                    Photo/Video
                </div>
                <div className="createPost_icon hover1">
                    <Feeling color="#f7b928" />
                    Feeling/Activity
                </div>
            </div>
        </div>
    );
}

import { Link } from "react-router-dom";
import { UserFocus } from "../../../svg";

export default function CurrentUser({ user }) {
    if (user) {
        return (
            <div>
                <Link to="/profile" className="mmenu_header hover2">
                    <img src={user?.photoURL} alt="" />
                    <div className="mmenu_col">
                        <span>{user?.displayName}</span>
                        <span>See your profile</span>
                    </div>
                </Link>
                <div className="mmenu_splitter"></div>
            </div>
        );
    }

    return (
        <div>
            <Link to="/login" className="mmenu_header hover2">
                <UserFocus color={"#e41e3f"} />
                <div className="mmenu_col--red">
                    <span>Please log in!</span>
                </div>
            </Link>
            <div className="mmenu_splitter"></div>
        </div>
    );
}

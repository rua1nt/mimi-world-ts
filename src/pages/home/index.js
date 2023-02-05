import { useSelector } from "react-redux";
import Header from "../../comps/header";
import LeftHome from "../../comps/home/left";
import RightHome from "../../comps/home/right";
import Stories from "../../comps/home/stories";
import CreatePost from "../../comps/createPost";
import SendVerification from "../../comps/home/sendVerification";
import "./style.css";

export default function Home() {
    const { user } = useSelector((state) => ({ ...state }));

    return (
        <div className="home">
            <Header />
            <LeftHome user={user} />
            <div className="home_middle">
                {/* {user.verified === false && <SendVerification user={user} />} */}
                {user?.verified && <SendVerification user={user} />}
                <Stories user={user} />
                <CreatePost user={user} />
            </div>
            <RightHome user={user} />
        </div>
    );
}

import { useSelector } from "react-redux";
import Header from "../../comps/header";
import LeftHome from "../../comps/home/left";
import RightHome from "../../comps/home/right";
import Stories from "../../comps/home/stories";
import CreatePost from "../../comps/createPost";
import "./style.css";

export default function Home() {
    const { user } = useSelector((user) => ({ ...user }));
    return (
        <div className="home">
            <Header />
            <LeftHome user={user} />
            <div className="home_middle">
                <Stories user={user} />
                <CreatePost user={user} />
            </div>
            <RightHome user={user} />
        </div>
    );
}

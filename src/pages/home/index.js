import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import LeftHome from "../../comps/home/left";
import RightHome from "../../comps/home/right";
import Stories from "../../comps/home/stories";
import SendVerification from "../../comps/home/sendVerification";
import Header from "../../comps/header";
import CreatePost from "../../comps/createPost";
import Post from "../../comps/post";

import "./style.css";

export default function Home({ setVisible, posts, loading }) {
    const { user } = useSelector((state) => ({ ...state }));
    const [height, setHeight] = useState();
    const middle = useRef(null);

    useEffect(() => {
        setHeight(middle.current.clientHeight);
    }, [loading]);

    return (
        // <div className="home">
        <div className="home" style={{ height: `${height + 80}px` }}>
            <Header page="home" />
            <LeftHome user={user} />

            <div className="home_middle" ref={middle}>
                {/* {user.verified === false && <SendVerification user={user} />} */}
                {user?.verified && <SendVerification user={user} />}
                <Stories user={user} />
                <CreatePost user={user} setVisible={setVisible} />

                <div className="posts">
                    {posts.map((post,i) => (
                        <Post key={i} post={post} user={user} />
                    ))}
                </div>
            </div>

            <RightHome user={user} />
        </div>
    );
}

import Post from "../../comps/post";

export default function DefaultModePost({ posts, user }) {
    return (
        <div className="posts">
            {posts.map((post) => (
                <Post key={post._id} post={post} user={user} />
            ))}
        </div>
    );
}

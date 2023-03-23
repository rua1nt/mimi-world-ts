import { Link } from "react-router-dom";
export default function Friends({ friends }) {
    return (
        <div className="profile_card">
            <div className="profile_card_header">
                Friends
                <div className="profile_header_link">See all friends</div>
            </div>
            {friends && (
                <div className="profile_card_count">
                    {friends.length === 0
                        ? ""
                        : friends.length === 1
                        ? "1 Friend"
                        : `${friends.length} friends`}
                </div>
            )}
            <div className="profile_card_grid">
                {friends &&
                    friends.slice(0, 9).map((friend, i) => (
                        <Link
                            to={`/profile/${friend.username}`}
                            className="profile_photo_card"
                            key={i}
                        >
                            <img src={friend.photo_url} alt="" />
                            <span>{friend.user_displayName}</span>
                        </Link>
                    ))}
            </div>
        </div>
    );
}

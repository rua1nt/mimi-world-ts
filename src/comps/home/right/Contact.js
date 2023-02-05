export default function Contact({ user }) {
    return (
        <div className="contact hover9">
            <div className="contact_img">
                <img
                    src={user?.photoURL || "../../../images/default_pic.png"}
                    alt=""
                />
            </div>
            <span>{user?.displayName || "Default Contact"}</span>
        </div>
    );
}

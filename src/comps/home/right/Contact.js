export default function Contact({ user }) {
    return (
        <div className="contact hover2">
            <div className="contact_img">
                <img src={user?.photoURL || "../../../images/default_pic.png"} alt="" />
            </div>
            <span>{user?.displayName || "Mimi - Đi đu đưa thôi!"}</span>
        </div>
    );
}

export default function LeftLink({ img, text, notification }) {
    let customClass =
        notification !== undefined
            ? "left_link left_link_with_noti hover2"
            : "left_link left_link_no_noti hover2";

    return (
        <div className={customClass}>
            <img src={`../../../left/${img}.png`} alt="" />
            {notification !== undefined ? (
                <div className="col">
                    <div className="col_1">{text}</div>
                    <div className="col_2">{notification}</div>
                </div>
            ) : (
                <span>{text}</span>
            )}
        </div>
    );
}

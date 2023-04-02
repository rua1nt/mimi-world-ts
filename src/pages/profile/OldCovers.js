import { useRef } from "react";
import { useSelector } from "react-redux";
import useClickOutside from "../../helpers/clickOutside";

export default function OldCovers({ photos, setCoverPicture, setShow }) {
    const { user } = useSelector((state) => ({ ...state }));
    const Ref = useRef(null);

    useClickOutside(Ref, () => setShow(false));

    return (
        <div className="blur">
            <div className="postBox selectCoverBox" ref={Ref}>
                <div className="box_header">
                    <div className="small_circle" onClick={() => setShow(false)}>
                        <i className="exit_icon"></i>
                    </div>
                    <span>Select photo</span>
                </div>
                <div className="selectCoverBox_links">
                    <div className="selectCoverBox_link">Recent Photos</div>
                    <div className="selectCoverBox_link">Photo Albums</div>
                </div>
                <div className="old_pictures_wrap scrollbar">
                    <div className="old_pictures">
                        {photos &&
                            photos
                                .filter((img) => img.folder === `${user.uid}/cover_pictures`)
                                .map((photo, i) => (
                                    <img
                                        src={photo.secure_url}
                                        key={i}
                                        alt=""
                                        onClick={() => {
                                            setCoverPicture(photo.secure_url);
                                            setShow(false);
                                        }}
                                    />
                                ))}
                    </div>
                    <div className="old_pictures">
                        {photos &&
                            photos
                                .filter((img) => img.folder !== `${user.uid}/post_images`)
                                .map((photo, i) => (
                                    <img
                                        src={photo.secure_url}
                                        key={i}
                                        alt=""
                                        onClick={() => {
                                            setCoverPicture(photo.secure_url);
                                            setShow(false);
                                        }}
                                    />
                                ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

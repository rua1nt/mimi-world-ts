import { Dots, Feeling, Photo } from "../../svg";

export default function AddToYourPost({ setShowPrev }) {
    return (
        <div className="addtoyourpost">
            <div className="addto_text">Add to your post</div>
            <div className="addto_options">
                <div
                    className="post_header_right hover2"
                    onClick={() => setShowPrev(true)}
                >
                    <Photo color="#45bd62" />
                </div>
                <div className="post_header_right hover2">
                    <i className="tag_icon"></i>
                </div>
                <div className="post_header_right hover2">
                    <Feeling color="#f7b928" />
                </div>
                <div className="post_header_right hover2">
                    <i className="maps_icon"></i>
                </div>
                <div className="post_header_right hover2">
                    <i className="microphone_icon"></i>
                </div>
                <div className="post_header_right hover2">
                    <Dots color="#65676b" />
                </div>
            </div>
        </div>
    );
}

import { useRef } from "react";
import EmojiPickerBackgrounds from "./EmojiPickerBackgrounds";

export default function ImagePreview({
    text,
    user,
    setText,
    images,
    setImages,
    setShowPrev,
    setError,
}) {
    const imageInputRef = useRef(null);

    const handleImages = (e) => {
        let files = Array.from(e.target.files);
        files.forEach((img) => {
            if (
                img.type !== "image/jpeg" &&
                img.type !== "image/png" &&
                img.type !== "image/webp" &&
                img.type !== "image/gif"
            ) {
                setError(`${img.name} format is not supported! Only Jpeg, Png, Webp, Gif!`);
                files = files.filter((item) => item.name !== img.name);
                return;
            }

            if (img.size > 1024 * 1024 * 3) {
                setError(`${img.name} is too large max 3MB allowed!`);
                files = files.filter((item) => item.name !== img.name);
                return;
            }

            const reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = (readerEvent) => {
                setImages((images) => [...images, readerEvent.target.result]);
            };
        });
    };

    return (
        <div className="overflow_a scrollbar">
            <EmojiPickerBackgrounds type2 text={text} user={user} setText={setText} />

            <div className={images?.length ? "add_pics_wrap" : "add_pics_empty"}>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    hidden
                    ref={imageInputRef}
                    onChange={handleImages}
                />

                {images?.length ? (
                    <div className="add_pics_inside1 p0">
                        <div className="preview_actions">
                            <button className="hover1">
                                <i className="edit_icon"></i>
                                Edit
                            </button>
                            <button className="hover1" onClick={() => imageInputRef.current.click()}>
                                <i className="addPhoto_icon"></i>
                                Add Photos/Videos
                            </button>
                        </div>

                        <div className="small_white_circle" onClick={() => setImages([])}>
                            <i className="exit_icon"></i>
                        </div>

                        <div
                            className={
                                images.length === 1
                                    ? "preview1"
                                    : images.length === 2
                                    ? "preview2"
                                    : images.length === 3
                                    ? "preview3"
                                    : images.length === 4
                                    ? "preview4"
                                    : images.length === 5
                                    ? "preview5"
                                    : images.length % 2 === 0
                                    ? "preview6"
                                    : "preview6 singular_grid"
                            }
                        >
                            {images.map((img, i) => (
                                <img src={img} key={i} alt="" />
                            ))}
                        </div>
                        <div className="create_gap"></div>
                    </div>
                ) : (
                    <>
                        <div className="add_pics_inside1">
                            <div className="small_white_circle" onClick={() => setShowPrev(false)}>
                                <i className="exit_icon"></i>
                            </div>
                            <div
                                className="add_col hover3"
                                onClick={() => imageInputRef.current.click()}
                            >
                                <div className="add_circle">
                                    <i className="addPhoto_icon"></i>
                                </div>
                                <span>Add Photos/Videos</span>
                                <span>or drag and drop</span>
                            </div>
                        </div>

                        <div className="add_pics_inside2">
                            <div className="add_circle">
                                <i className="phone_icon"></i>
                            </div>
                            <div className="mobile_text">Add photos from your mobile device.</div>
                            <span className="addphone_btn">Add</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

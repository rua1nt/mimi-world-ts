import axios from "axios";

export const uploadImages = async (files) => {
    const uploaders = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("tags", `3 yrs-old`);
        formData.append("folder", process.env.CLOUDINARY_FOLDER);
        formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);

        const result = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
        );
        return result.data.secure_url;
    });

    try {
        const result = await axios.all(uploaders);
        return [...result];
    } catch (ex) {
        return ex.message;
    }
};

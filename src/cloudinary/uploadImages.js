import axios from "axios";

export const uploadImages = async (files, mimiDate) => {
    const uploaders = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("tags", `${mimiDate.age} age, ${mimiDate.month} month`);
        formData.append("folder", process.env.REACT_APP_CLOUDINARY_FOLDER);
        formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

        const result = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
        );
        return result.data.secure_url;
    });

    try {
        const result = await axios.all(uploaders);
        return [...result];
    } catch (ex) {
        return { NOT_OK: ex.message };
    }
};

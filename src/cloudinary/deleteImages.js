import axios from "axios";
import { sha1 } from "crypto-hash";

// TODO
export const deleteImages = async (files, mimiDate) => {
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

export const deleteImage = async (publicId) => {
    const timestamp = new Date().getTime();
    const signature = await sha1(
        `public_id=${publicId}&timestamp=${timestamp}${process.env.REACT_APP_CLOUDINARY_API_SECRET}`
    );

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/destroy`,
            {
                public_id: publicId,
                timestamp,
                signature,
                api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
            }
        );
        if (response.status === 200) return { status: "OK" };
    } catch (ex) {
        return ex.message;
    }
};

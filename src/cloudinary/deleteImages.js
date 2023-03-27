import axios from "axios";
import crypto from "crypto";

export const deleteImage = async (files, mimiDate) => {
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

const handleDeleteImage = async (publicId) => {
    const cloudName = "your_cloud_name";
    const timestamp = new Date().getTime();
    const apiKey = "your_api_key";
    const apiSecret = "your_api_secret";
    const signature = generateSHA1(generateSignature(publicId, apiSecret));
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

    try {
        const response = await axios.post(url, {
            public_id: publicId,
            signature: signature,
            api_key: apiKey,
            timestamp: timestamp,
        });

        console.error(response);
    } catch (error) {
        console.error(error);
    }
};

const generateSHA1 = (data) => {
    const hash = crypto.createHash("sha1");
    hash.update(data);
    return hash.digest("hex");
};

const generateSignature = (publicId, apiSecret) => {
    const timestamp = new Date().getTime();
    return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

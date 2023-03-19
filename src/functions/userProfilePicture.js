import axios from "axios";

export const updateprofilePicture = async (url, token) => {
    try {
        const { data } = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/updateProfilePicture`,
            { url },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return "ok";
    } catch (ex) {
        return ex.message;
    }
};

export const updateCover = async (url, token) => {
    try {
        const { data } = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/updateCover`,
            { url },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return "ok";
    } catch (ex) {
        return ex.message;
    }
};
import axios from "axios";

export const updateProfilePicture = async (url, token) => {
    try {
        const { data } = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/updateProfilePicture`,
            { url },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return { status: "ok", data };
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
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return { status: "ok", data };
    } catch (ex) {
        return ex.message;
    }
};

export const addFriend = async (id, token) => {
    try {
        const { data } = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/addFriend/${id}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return { status: "ok", data };
    } catch (ex) {
        return ex.message;
    }
};
export const cancelRequest = async (id, token) => {
    try {
        const { data } = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/cancelRequest/${id}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return { status: "ok", data };
    } catch (ex) {
        return ex.message;
    }
};
export const follow = async (id, token) => {
    try {
        const { data } = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/follow/${id}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return { status: "ok", data };
    } catch (ex) {
        console.log(ex.message);
        return ex.message;
    }
};
export const unfollow = async (id, token) => {
    try {
        const { data } = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/unfollow/${id}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return { status: "ok", data };
    } catch (ex) {
        return ex.message;
    }
};
export const acceptRequest = async (id, token) => {
    try {
        const { data } = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/acceptRequest/${id}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return { status: "ok", data };
    } catch (ex) {
        return ex.message;
    }
};
export const unfriend = async (id, token) => {
    try {
        const { data } = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/unfriend/${id}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return { status: "ok", data };
    } catch (ex) {
        return ex.message;
    }
};
export const deleteRequest = async (id, token) => {
    try {
        const { data } = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/deleteRequest/${id}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return { status: "ok", data };
    } catch (ex) {
        return ex.message;
    }
};

export const search = async (searchTerm, token) => {
    try {
        const { data } = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/search/${searchTerm}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return data;
    } catch (ex) {
        return ex.message;
    }
};
export const addToSearchHistory = async (searchUser, token) => {
    try {
        const { data } = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/addToSearchHistory`,
            { searchUser },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return data;
    } catch (ex) {
        return ex.message;
    }
};
export const getSearchHistory = async (token) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getSearchHistory`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return data;
    } catch (ex) {
        return ex.message;
    }
};
export const removeFromSearch = async (searchUser, token) => {
    try {
        const { data } = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/removeFromSearch`,
            { searchUser },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return data;
    } catch (ex) {
        return ex.message;
    }
};

export const getFriendsPageInfos = async (token) => {
    try {
        const { data } = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/getFriendsPageInfos`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return { status: "ok", data };
    } catch (ex) {
        return ex.message;
    }
};

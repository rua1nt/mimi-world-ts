import { firestore } from "./firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { Timestamp, serverTimestamp } from "firebase/firestore";

const postCollection = "posts";

export const fsAddPost = async (
    type,
    background,
    text,
    images,
    user,
    mimiAge,
    mimiMonth,
    mimiDate
) => {
    try {
        await addDoc(collection(firestore, postCollection), {
            userId: user.uid,
            type,
            background,
            text,
            images,
            mimiAge,
            mimiMonth,
            mimiTimestamp: Timestamp.fromDate(new Date(mimiDate)),
            createdAt: serverTimestamp(),
        });
    } catch (ex) {
        return ex.message;
    }
};

export const fsUpdatePost = async (postId, user) => {
    try {
    } catch (ex) {
        return ex.message;
    }
};

export const fsDeletePost = async (postId, user) => {
    try {
    } catch (ex) {
        return ex.message;
    }
};

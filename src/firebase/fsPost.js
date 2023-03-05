import { firestore } from "./firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { Timestamp, serverTimestamp } from "firebase/firestore";

const fsCollection = "posts";

export const fsAddPost = async (type, background, text, images, user, mimiDate) => {
    try {
        await addDoc(collection(firestore, fsCollection), {
            user_id: user.uid,
            type,
            background,
            text,
            images,
            mi_age: mimiDate.age,
            mi_month: mimiDate.month,
            mi_date: Timestamp.fromDate(mimiDate.date),
            created_at: serverTimestamp(),
        });
        return "OK";
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

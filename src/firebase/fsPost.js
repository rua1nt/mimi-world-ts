import { useState, useEffect } from "react";
import { firestore } from "./firebase-config";
import { Timestamp, serverTimestamp } from "firebase/firestore";
import { addDoc, collection, onSnapshot, query, orderBy } from "firebase/firestore";

const fsCollection = "posts";

function usePostsCollection() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const q = query(collection(firestore, fsCollection), orderBy("mi_date", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) =>
            setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), post_id: doc.id })))
        );

        return unsubscribe;
    }, []);

    return posts;
}

// export const fsGetPosts = async () => {
//     try {
//         const q = query(collection(firestore, fsCollection), orderBy("mi_date", "desc"));
//         const unsubscribe = onSnapshot(q, (snapshot) => {
//             const posts = [];
//             snapshot.forEach((doc) => posts.push(doc.data()));
//         });

//         return [];
//     } catch (ex) {
//         return ex.message;
//     }
// };

export const fsGetPost = async (postId, user) => {
    try {
    } catch (ex) {
        return ex.message;
    }
};

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

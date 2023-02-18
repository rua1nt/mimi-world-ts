import { firestore } from "./firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { updateDoc, Timestamp, serverTimestamp } from "firebase/firestore";

export const fsAddPost = async (type, background, text, images, user) => {
    await setDoc(doc(firestore, "testU", "user1"), {
        name: "tuan 1",
        email: "tuan1@gmail.com",
        timestamp: Timestamp.fromDate(new Date("April 22, 2020")),
        created_at: serverTimestamp(),
        admin: true,
        add: true,
        edit: true,
        delete: true,
    });

    const docRef = await addDoc(collection(firestore, "testU"), {
        name: "tuan 2",
        email: "tuan2@gmail.com",
        timestamp: Timestamp.fromDate(new Date("April 23, 2020")),
        created_at: serverTimestamp(),
        admin: false,
        add: true,
        edit: false,
        delete: false,
    });

    return "ok";
};

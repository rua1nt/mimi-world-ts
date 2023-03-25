import { firestore } from "./firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { updateDoc, Timestamp, serverTimestamp } from "firebase/firestore";

const fsCollection = "pubs";

export const fsAddPub = async (type, background, text, images, user) => {
    try {
        await setDoc(doc(firestore, fsCollection, user.uid), {
            email: "tuan1@gmail.com",
            timestamp: Timestamp.fromDate(new Date("April 22, 2020")),
            created_at: serverTimestamp(),
            pAdmin: false,
            pFull: true,
            text,
            background,
        });
        await setDoc(doc(firestore, fsCollection, "user 2"), {
            userId: "user uid 2",
            email: "tuan2@gmail.com",
            timestamp: Timestamp.fromDate(new Date("April 23, 2020")),
            created_at: serverTimestamp(),
            pAdmin: false,
            pFull: true,
            text,
            background,
        });

        // test "users" rule!
        await setDoc(doc(firestore, "users", "should fail"), {
            userId: user.uid,
            email: "tuan2@gmail.com",
            timestamp: Timestamp.fromDate(new Date("April 22, 2020")),
            created_at: serverTimestamp(),
            text,
            background,
        });

        const docRef = await addDoc(collection(firestore, fsCollection), {
            name: "tuan auto uid",
            email: "tuan2@gmail.com",
            timestamp: Timestamp.fromDate(new Date("April 25, 2020")),
            created_at: serverTimestamp(),
            pAdmin: false,
            pFull: true,
            text,
            background,
        });

        return "OK";
    } catch (ex) {
        return ex.message;
    }
};

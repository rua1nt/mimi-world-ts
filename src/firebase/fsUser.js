import { firestore } from "./firebase-config";
import { updateDoc } from "firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";

const fsCollection = "users";

export const fsAddUser = async (user) => {
    try {
        const userRef = doc(firestore, fsCollection, user.uid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
            await setDoc(doc(firestore, fsCollection, user.uid), {
                email: user.email,
                photoURL: user.photoURL,
                providerId: user.providerId,
            });
        }
    } catch (ex) {
        return ex.message;
    }
};

export const fsUpdateUser = async (user) => {
    try {
        const userRef = doc(firestore, fsCollection, user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            await updateDoc(userRef, { pAdmin: true });
        } else {
            // check?
        }
    } catch (ex) {
        return ex.message;
    }
};

export const isUserExisted = async (user) => {
    const userRef = doc(firestore, fsCollection, user.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
        // console.log("User data:", userSnap.data());
        return true;
    } else {
        // userSnap.data() will be undefined
        return false;
    }
};

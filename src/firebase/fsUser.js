import { firestore } from "./firebase-config";
import { updateDoc } from "firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";

const userCollection = "users";

export const fsAddUser = async (user) => {
    try {
        const userRef = doc(firestore, userCollection, user.uid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
            await setDoc(doc(firestore, userCollection, user.uid), {
                email: user.email,
                photoURL: user.photoURL,
                providerId: user.providerId,
                pFull: false,
            });
        }
    } catch (ex) {
        return ex.message;
    }
};

export const fsUpdateUser = async (user) => {
    try {
        const userRef = doc(firestore, userCollection, user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            await updateDoc(userRef, { isAdmin: true });
        } else {
            // check?
        }
    } catch (ex) {
        return ex.message;
    }
};

export const isUserExisted = async (user) => {
    const userRef = doc(firestore, userCollection, user.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
        // console.log("User data:", userSnap.data());
        return true;
    } else {
        // userSnap.data() will be undefined
        return false;
    }
};

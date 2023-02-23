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
        isAdmin: true,
        pFull: true,
    });

    const docRef = await addDoc(collection(firestore, "testU"), {
        name: "tuan 2",
        email: "tuan2@gmail.com",
        timestamp: Timestamp.fromDate(new Date("April 23, 2020")),
        created_at: serverTimestamp(),
        isAdmin: false,
        pFull: true,
    });

    return "ok";
};

// FriendlyEats.prototype.getAllRestaurants = function (renderer) {
//     var query = firebase
//         .firestore()
//         .collection("restaurants")
//         .orderBy("avgRating", "desc")
//         .limit(50);

//     this.getDocumentsInQuery(query, renderer);
// };

// FriendlyEats.prototype.getDocumentsInQuery = function (query, renderer) {
//     query.onSnapshot(function (snapshot) {
//         if (!snapshot.size) return renderer.empty(); // Display "There are no restaurants".

//         snapshot.docChanges().forEach(function (change) {
//             if (change.type === "removed") {
//                 renderer.remove(change.doc);
//             } else {
//                 renderer.display(change.doc);
//             }
//         });
//     });
// };

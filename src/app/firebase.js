import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDKEVpie7Lla5YieUnz7_ieklTBEPXLhpw",
    authDomain: "event-689d2.firebaseapp.com",
    projectId: "event-689d2",
    storageBucket: "event-689d2.appspot.com",
    messagingSenderId: "533575156008",
    appId: "1:533575156008:web:00f4fe81712810c492d01d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app)

export {
    db,
    storage,
}
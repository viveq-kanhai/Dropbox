import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDzJXYJPae4dUVfVWnz9Wpzwv4oNukux1M",
  authDomain: "dropbox-clone-55994.firebaseapp.com",
  projectId: "dropbox-clone-55994",
  storageBucket: "dropbox-clone-55994.appspot.com",
  messagingSenderId: "464346119166",
  appId: "1:464346119166:web:e67919e1e0cb27f0d01eaf",
  measurementId: "G-1XPTQ18565",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyC5OAUPhMMET0KfN-_OtZ_O2of68YwFLSA",
  authDomain: "agri-diary-2361e.firebaseapp.com",
  projectId: "agri-diary-2361e",
  storageBucket: "agri-diary-2361e.appspot.com",
  messagingSenderId: "304254673893",
  appId: "1:304254673893:web:3cef047733133659e0c50c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, provider, db, storage }
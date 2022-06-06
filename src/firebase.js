import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAgrOcIgcMdQ7wvTViBaeLcz0NJcCOJ63c",
  authDomain: "movies-devf-fullstack.firebaseapp.com",
  databaseURL: "https://movies-devf-fullstack-default-rtdb.firebaseio.com",
  projectId: "movies-devf-fullstack",
  storageBucket: "movies-devf-fullstack.appspot.com",
  messagingSenderId: "68103971334",
  appId: "1:68103971334:web:f0e1a2311a675ce270d987"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

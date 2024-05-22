import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD0iS0CWD55AXgtqJDqSnCvHXSP6N2xsWQ",
  authDomain: "crud-app-b7c22.firebaseapp.com",
  projectId: "crud-app-b7c22",
  storageBucket: "crud-app-b7c22.appspot.com",
  messagingSenderId: "849553977701",
  appId: "1:849553977701:web:52202dbf2f1e880c35b18c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const fireDb = getFirestore(app);
export const storage = getStorage();

import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, get, update } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgEkclhzaeBUanrZC6x31Ml997LhAUX2Y",
  authDomain: "grrn-resource-network.firebaseapp.com",
  databaseURL: "https://grrn-resource-network-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "grrn-resource-network",
  storageBucket: "grrn-resource-network.firebasestorage.app",
  messagingSenderId: "383966563074",
  appId: "1:383966563074:web:9f6bfd08f233ed06ef101b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, push, get, update };
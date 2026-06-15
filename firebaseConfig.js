import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js"; 
const firebaseConfig = {
  apiKey: "AIzaSyDxhduIWiv5xkuySgWlntuYnCweS3aRM5M",
  authDomain: "npsbapp.firebaseapp.com",
  projectId: "npsbapp",
  storageBucket: "npsbapp.firebasestorage.app",
  messagingSenderId: "218858501285",
  appId: "1:218858501285:web:66781bee7880feb7d3094c",
  measurementId: "G-5V4T7X09E3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 
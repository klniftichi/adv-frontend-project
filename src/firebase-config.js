import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCt3VibwAPgxeC2Cyqkg4c6qUk0QRiCSpA",
  authDomain: "frontendavansat-2aef4.firebaseapp.com",
  projectId: "frontendavansat-2aef4",
  storageBucket: "frontendavansat-2aef4.appspot.com",
  messagingSenderId: "196518180616",
  appId: "1:196518180616:web:12d9a6d988ea6a4cdd1ebd",
  measurementId: "G-5Q22C0GW5M"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
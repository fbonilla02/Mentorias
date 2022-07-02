// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/firestore'
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVRPtC8gul4HwN92kzMRVOv4oRXgY5S_o",
  authDomain: "monitorias-506d9.firebaseapp.com",
  projectId: "monitorias-506d9",
  storageBucket: "monitorias-506d9.appspot.com",
  messagingSenderId: "451451887128",
  appId: "1:451451887128:web:2dcfb2593f14ba8d632d6d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
//export const db = app.firestore();
//import * as firebase from 'firebase';
import firebase from "firebase/app";
import "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBu8piaoJ8Vh369GKros-jC1h0nme07qfE",
    authDomain: "parcialpd.firebaseapp.com",
    projectId: "parcialpd",
    storageBucket: "parcialpd.appspot.com",
    messagingSenderId: "334001840746",
    appId: "1:334001840746:web:a7640bf9835941b754a013"
};
// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
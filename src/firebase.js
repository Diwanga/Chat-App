import firebase from "firebase/app";
import "firebase/auth";


export const auth = firebase.initializeApp({

    apiKey: "AIzaSyCDM9LhQaFuCiA8OlLEmNPi0nb8FdfG-Fc",
    authDomain: "chatty-4053a.firebaseapp.com",
    projectId: "chatty-4053a",
    storageBucket: "chatty-4053a.appspot.com",
    messagingSenderId: "369130419260",
    appId: "1:369130419260:web:94a266c4a500d148bcff39"

}).auth();

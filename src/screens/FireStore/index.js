import firebase from "firebase";
import "firebase/firestore";
const signedInUser = firebase.auth().currentUser.uid;
const db = firebase.firestore().collection("users");

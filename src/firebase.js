import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/firestore'
import 'firebase/storage'
firebase.initializeApp({
  apiKey: "AIzaSyA22mNCN8EHDR8p1Eo6AJ0uVajeU3FjZYU",
  authDomain: "fir-auth-93f42.firebaseapp.com",
  projectId: "fir-auth-93f42",
  storageBucket: "fir-auth-93f42.appspot.com",
  messagingSenderId: "990739157732",
  appId: "1:990739157732:web:7174783427778f025952f1"
})
export const auth = firebase.auth()
const firestore = firebase.firestore();
export const database ={
  users:firestore.collection('users'),
  posts:firestore.collection('posts'),
  comments:firestore.collection('comments'),
  getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp,
  formatDoc:doc=>{
    return {id:doc.id,...doc.data()}
  }
}
export const storage = firebase.storage();
export default firebase
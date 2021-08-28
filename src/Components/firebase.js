import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
let obj = require('./secrets');
firebase.initializeApp(obj);
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const db = {
  users: firestore.collection('users'),
  posts: firestore.collection('posts'),
  timeStamp: firebase.firestore.FieldValue.serverTimestamp,
};
export const auth = firebase.auth();
export default auth;

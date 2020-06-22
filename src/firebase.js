import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBUg2ChT4L_XQS5_FOwPpAD8Ki4E1yR9_s",
    authDomain: "project5-8ad8a.firebaseapp.com",
    databaseURL: "https://project5-8ad8a.firebaseio.com",
    projectId: "project5-8ad8a",
    storageBucket: "project5-8ad8a.appspot.com",
    messagingSenderId: "238062275039",
    appId: "1:238062275039:web:7f9016ed5fc1e97f62dc6a"
};
firebase.initializeApp(firebaseConfig);

export default firebase;

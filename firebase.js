import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
const firebaseConfig = {
    apiKey: "AIzaSyAZf3NCBVilOeCuJ7Rs2vQmEd-VLox5h9c",
    authDomain: "lastapp-de1b2.firebaseapp.com",
    projectId: "lastapp-de1b2",
    storageBucket: "lastapp-de1b2.appspot.com",
    messagingSenderId: "150610749942",
    appId: "1:150610749942:web:1ccfc264b7ab115d9fbfd7"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };

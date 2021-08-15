import firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyC19q45FPi4qPOEI9jOxP0SsmL276XH9FA",
  authDomain: "invoice-app-44601.firebaseapp.com",
  projectId: "invoice-app-44601",
  storageBucket: "invoice-app-44601.appspot.com",
  messagingSenderId: "1094829254664",
  appId: "1:1094829254664:web:95c0909dae56c68e2a49bd",
  measurementId: "G-43YF24GLH0"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
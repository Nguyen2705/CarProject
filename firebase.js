import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDApbcZJQrNmvE8n2h-xFrNNivyuUgqcKc",
  authDomain: "car-project-b12f9.firebaseapp.com",
  databaseURL: "https://car-project-b12f9-default-rtdb.firebaseio.com",
  projectId: "car-project-b12f9",
  storageBucket: "car-project-b12f9.appspot.com",
  messagingSenderId: "808665816378",
  appId: "1:808665816378:web:88edbc64a587909ffe4403",
  measurementId: "G-P609EPJE9M"
};

// Initialize Firebase
let app;
if(firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig);
} else {  
  app = firebase.app();
} 

const auth = firebase.auth();

export { auth };
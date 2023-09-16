import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as firebase from 'firebase'; // Import Firebase
import HomeScreen from './components/Screens/HomeScreen.js';
import LoginScreen from './components/Screens/LoginScreen.js';
import SignUpScreen from './components/Screens/Signup.js';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDApbcZJQrNmvE8n2h-xFrNNivyuUgqcKc",
  authDomain: "car-project-b12f9.firebaseapp.com",
  projectId: "car-project-b12f9",
  storageBucket: "car-project-b12f9.appspot.com",
  messagingSenderId: "808665816378",
  appId: "1:808665816378:web:88edbc64a587909ffe4403",
  measurementId: "G-P609EPJE9M"
};

// Initialize Firebase
let app;
if (!firebase.app.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth()

export { auth }; 
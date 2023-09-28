import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as firebase from 'firebase';

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
firebase.initializeApp(firebaseConfig); 

// Initialize variables
const auth = firebase.auth()
const database = firebase.database(); 

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const pushUserDataToFirebase = async (name, email) => {
    try {
      // Reference to the Firebase Realtime Database
      const dbRef = firebase.database().ref();

      // Data to be pushed
      const userData = {
        name,
        email,
      };

      // Push the data to a specific location (e.g., 'users')
      await dbRef.child('users').push(userData);

      console.log('Data pushed to Firebase successfully');
    } catch (error) {
      console.error('Error pushing data to Firebase:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password); 

        const user = userCredential.user; 
        console.log('User registered: ', user); 
    } catch ( error ) {
        cosole.error('Error register: ', user.message); 
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Register</Text>
      <TextInput
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Full Name"
      />
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="youremail@gmail.com"
      />
      <TextInput
        value={pwd}
        onChangeText={(text) => setPwd(text)}
        secureTextEntry={true}
        placeholder="********"
      />
      <Button title="Register" onPress={handleSubmit} />
      <Button
        title="Already have an account? Log in."
        onPress={() => props.onFormSwitch('register')}
      />
    </View>
  );
};

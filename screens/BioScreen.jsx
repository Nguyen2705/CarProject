// Import statements
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getApps, initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDApbcZJQrNmvE8n2h-xFrNNivyuUgqcKc",
  authDomain: "car-project-b12f9.firebaseapp.com",
  projectId: "car-project-b12f9",
  storageBucket: "car-project-b12f9.appspot.com",
  messagingSenderId: "808665816378",
  appId: "1:808665816378:web:88edbc64a587909ffe4403",
  measurementId: "G-P609EPJE9M"
};

// Initialize Firebase only if there are no initialized apps
if (!getApps().length) {
    initializeApp(firebaseConfig);
}

const firestore = getFirestore();
const auth = getAuth();

const BioScreen = () => {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [userId, setUserId] = useState(null); // State to store the user ID

    // Effect to listen to the authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, set the userId state
                setUserId(user.uid);
            } else {
                // User is signed out
                // Handle user being signed out if needed
            }
        });

        // Cleanup subscription on unmount
        return unsubscribe;
    }, []);

    const handleSaveProfile = async () => {
        if (!userId) {
            Alert.alert('Error', 'No user is signed in.');
            return;
        }

        try {
            // Save the user's profile data to Firestore
            const userRef = doc(firestore, 'users', userId);
            await setDoc(userRef, {
                name: name,
                bio: bio,
            }, { merge: true });

            Alert.alert('Profile Saved', 'Your profile has been updated successfully.');
        } catch (error) {
            console.error("Error writing document: ", error);
            Alert.alert('Error', 'There was an issue saving your profile.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit Profile</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Bio"
                value={bio}
                onChangeText={setBio}
                multiline
            />
            <Button title="Save Profile" onPress={handleSaveProfile} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
});

export default BioScreen;
import React from 'react'; 
import { View, Text, StyleSheet } from 'react-native'; 

const NotificationScreen = () => {
    return (
        <View style={styles.container}>
        <Text>Bio Screen Content Goes Here</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
});

export default NotificationScreen; 

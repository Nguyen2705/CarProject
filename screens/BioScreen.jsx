import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';

const firestore = getFirestore();
const auth = getAuth();

const BioScreen = () => {
    const navigation = useNavigation();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [username, setUsername] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    // Define handleGoBack function
    const handleGoBack = () => {
        navigation.goBack();
    };
    const handleSaveProfile = async () => {
        const user = auth.currentUser;
        if (!user) {
            Alert.alert('Error', 'No user is signed in.');
            return;
        }

        try {
            const userRef = doc(firestore, 'users', user.uid);
            await updateDoc(userRef, {
                firstName, // Assuming 'firstName' is the field in your Firestore
                lastName,  // Assuming 'lastName' is the field in your Firestore
                username,
                bio        // Assuming 'bio' is the field in your Firestore
            });

            Alert.alert('Profile Saved', 'Your profile has been updated successfully.');
            navigation.goBack();
        } catch (error) {
            console.error("Error updating document: ", error);
            Alert.alert('Error', 'There was an issue saving your profile.');
        }
    };
    useEffect(() => {
        const loadUserProfile = async () => {
            const user = auth.currentUser;
            if (user) {
                const userRef = doc(firestore, 'users', user.uid);
                const docSnap = await getDoc(userRef);

                if (docSnap.exists()) {
                    setFirstName(docSnap.data().firstName);
                    setLastName(docSnap.data().lastName);
                    setUsername(docSnap.data().username);
                    setBio(docSnap.data().bio);
                } else {
                    // Document does not exist
                    Alert.alert('Error', 'User data not found.');
                }
            }
        };

        loadUserProfile();
    }, []);

    // Styles definition remains the same...
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#EDEDED',
            padding: 16,
            justifyContent: 'center',
            alignContent: 'center',
        },
        goBackButton: {
            position: 'absolute',
            top: Platform.OS == 'ios' ? 65 : 20,
            left: 10,
            zIndex: 2,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 20,
            textAlign: 'center',
        },
        input: {
            width: '100%',
            padding: 10,
            marginBottom: 10,
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 5,
        },
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
        },
        modalView: {
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        buttonText: {
            color: 'black', 
            fontWeight: 'bold',
        },
        button: {
            backgroundColor: '#faca63',
            padding: 17,
            borderRadius: 15,
            alignItems: 'center',
        }
        // Add other styles you may need
    });

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
                <Ionicons name="chevron-back-outline" size={30} color="#333363" />
            </TouchableOpacity>
            <Text style={styles.title}>Edit Profile</Text>
            {/* First Name */}
            <Text style={styles.label}>First Name:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your first name"
                value={firstName}
                onChangeText={setFirstName}
            />
            {/* Last Name */}
            <Text style={styles.label}>Last Name:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your last name"
                value={lastName}
                onChangeText={setLastName}
            />
            {/* Username */}
            <Text style={styles.label}>Username:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your username"
                value={username}
                onChangeText={setUsername}
            />
            {/* Bio */}
            <Text style={styles.label}>Bio:</Text>
            <TextInput
                style={styles.input}
                placeholder="Write a short bio about yourself"
                value={bio}
                onChangeText={setBio}
                multiline
            />
            <TouchableOpacity 
                onPress={handleSaveProfile} 
                style={styles.button}>
                <Text style={styles.buttonText}>
                    Save Profile
                </Text>
            </TouchableOpacity>
        </View>
        </TouchableWithoutFeedback>
    );
};

export default BioScreen;

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, firestore, storage } from '../firebase';
import { ref, getDownloadURL } from "firebase/storage";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Ionicons from '@expo/vector-icons/Ionicons';

const ViewProfileScreen = () => {
    const [imageURL, setImageURL] = useState(null); 
    const [currentUser, setCurrentUser] = useState(null);
    const navigation = useNavigation(); 

    const db = firebase.firestore();

    const handleGoBack = () => {
        navigation.goBack();
      };

    const fetchUserData = async (uid) => {
        const userRef = db.collection('users').doc(uid);
        try {
            const doc = await userRef.get();
            if (doc.exists) {
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            if (user) {
                fetchUserData(user.uid);
                const storageRef = ref(storage, 'profileImage/' + user.uid);
                getDownloadURL(storageRef)
                    .then(url => setImageURL(url))
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribeFocus = navigation.addListener('focus', () => {
            if (currentUser) {
                fetchUserData(currentUser.uid);
            }
        });

        return unsubscribeFocus;
    }, [currentUser]);

    return (
        (currentUser && 
        <View style={styles.container}>
          
        <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
          <Ionicons name="close-outline" size={35} color="white" />
        </TouchableOpacity>
    
            <Image
                style={styles.photo} 
                source={{ uri: imageURL || 'https://firebasestorage.googleapis.com/v0/b/car-project-b12f9.appspot.com/o/profileImage%2Fdefault.png?alt=media&token=e2443c3b-fc13-4eff-8533-e7c6504dc737'}}
            />
        </View>)
    )
}; 

export default ViewProfileScreen; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', 
        backgroundColor: 'black',
        alignItems: 'center',
    },
    photo: {
        width: '100%',  
        height: 400, 
        alignItems: 'center',
        borderBottomWidth: 1, 
    },
    goBackButton: {
        position: 'absolute',
        top: Platform.OS == 'ios' ? 60 : 30 ,
        left: 15,
    },
})
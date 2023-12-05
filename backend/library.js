import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as FileSystem from 'expo-file-system';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { auth, firestore, storage } from '../firebase';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';

export default function LibraryScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Add this state to track whether the image is being edited
  const [isUploading, setIsUploading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const db = firebase.firestore();
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need media library permissions to make this work!');
          // Redirect back to ProfileScreen when permission is denied
          navigation.goBack();
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [9, 16],
        quality: 1,
      });
  
      if (!result.canceled) {
        // Use the assets array instead of uri
        const selectedAsset = result.assets[0];
        setSelectedImage(selectedAsset.uri);
        setIsEditing(true); // Enable editing mode
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  // Add a function to handle saving the profile picture
  const saveProfilePicture = async () => {
    // Here, you can save the selectedImage as the profile picture
    // and update your app's state or data accordingly.
    // For example, you can send the image URI to your server for storage.
    setIsEditing(false); // Disable editing mode after saving
    setIsUploading(true);
    let filename = currentUser.uid;
    
    //Check whether or not filename is exist in profileImage folder
    //If yes, delete current filename to later store new filename
    const existingRef = firebase.storage().ref().child('profileImage').child(filename);
    try {
      await existingRef.getDownloadURL();
  
      // If the file exists, delete it
      await existingRef.delete();
      console.log('Existing file deleted.');
    } catch (error) {
      // Ignore errors if the file doesn't exist
    }

    try {
      const{ uri } = await FileSystem.getInfoAsync(selectedImage);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      });

      const ref = firebase.storage().ref().child('profileImage').child(filename);

      await ref.put(blob);
      setIsUploading(false);
      setSelectedImage(null);

    } catch (error) {
      console.error(error);
      setIsUploading(false);
    };

    try {
      const userRef = doc(firestore, 'users', currentUser.uid);
      await updateDoc(userRef, {
          profileImage: filename, 
      });

      Alert.alert('Image updated successfully');
      navigation.goBack();
  } catch (error) {
      console.error('Error updating image', error);
      Alert.alert('Error', 'There was an issue saving your profile.');
  }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Library</Text>
        {isEditing && ( // Show the "Save" button only when in editing mode
            <TouchableOpacity style={styles.saveButton} onPress={saveProfilePicture}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          )}
      </View>
      {selectedImage ? (
        <>
          
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
        </>
      ) : (
        <Text style={styles.noImageText}>No image selected</Text>
      )}
      <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
        <Text style={styles.selectButtonText}>Choose from Album</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginTop: Platform.OS === 'ios' ? 55 : 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  selectedImage: {
    width: '95%',
    height: '70%',
    alignSelf: 'center',
    marginTop: 50,
  },
  noImageText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  selectButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    margin: 20,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 5 : -5, // Adjust this value as needed
    left: 0, // Adjust this value as needed
    right: 0, // Adjust this value as needed
  },
  saveButton: {
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    top: 65, // Adjust this value as needed to position the button
    right: 10, // Adjust this value as needed to position the button
  },
  saveButtonText: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

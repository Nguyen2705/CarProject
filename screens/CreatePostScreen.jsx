import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, firestore, storage } from '../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { FontAwesome, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { pick } from 'lodash';
import { ScrollView } from 'react-native-gesture-handler';

const CreatePostScreen = () => {
  const [caption, setCaption] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // New state for selected image
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  const db = firebase.firestore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch the current user when the component mounts
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (selectedImage) {
      console.log('Selected image:', selectedImage);
    }
  }, [selectedImage]);


  const handlePost = async () => {
    try {
      const currentUser = auth.currentUser;
  
      if (!currentUser) {
        throw new Error('User not signed in');
      }
  
      console.log('Selected image:', selectedImage);
  
      if (!selectedImage) {
        Alert.alert('Error', 'Please select an image before posting.');
        return;
      }
  
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  
      // Generate a unique post ID
      const postId = `${currentUser.uid}_${timestamp}_${Math.random().toString(36).substr(2, 9)}`;
  
      const imageRef = storage.ref().child(`posts/${postId}.jpg`);
  
      // Upload the image to Firebase Storage
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      await imageRef.put(blob);
  
      // Fetch additional user data from 'users' collection
      const userDoc = await db.collection('users').doc(currentUser.uid).get();
      const userData = userDoc.data();
  
      const postRef = await db.collection('posts').doc(postId).set({
        image: await imageRef.getDownloadURL(),
        caption: caption,
        timestamp: timestamp,
        userId: currentUser.uid,
        userName: userData?.username || currentUser.displayName || 'Default Username',
        userImage: userData?.profileImage || 'https://example.com/default_profile.jpg',
        numOfComments: 0,
        comments: [],
        likes: 0,
      });
  
      console.log('Post created with ID:', postId);
  
      setCaption('');
      setSelectedImage(null);
  
      Alert.alert('Success', 'Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error.message);
      Alert.alert('Error', 'Failed to create post. Please try again.');
    }
  };
  
  
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [9, 16],
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.uri);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <ScrollView  style={styles.container}>
      <View style={styles.headerBackground}>
        <Text 
            style={{
                top: Platform.OS == 'ios' ? 20 : 5,
                fontSize: 18,
                fontWeight: 'bold',
                color: '#333363', // Header text color
        }}>Create Post</Text>
      </View>

      {user && (
        <View style={styles.header}>
          {user.photoURL ? (
            <Image source={{ uri: user.photoURL }} style={styles.profileImage} />
          ) : (
            <DefaultProfileImage />
          )}
          <Text style={styles.username}>
            {user.userData?.username || user.displayName || 'Default Username'}
          </Text>
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Write a caption..."
        value={caption}
        onChangeText={(text) => setCaption(text)}
      />

      <View style={styles.footer}>
        <TouchableOpacity onPress={pickImage}>
          <FontAwesome name="photo" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {navigation.navigate('Camera')}}>
          <Feather name="camera" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity style={styles.postButton} onPress={handlePost}>
        <Text style={styles.postButtonText}>Share</Text>
      </TouchableOpacity> */}

      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
      )}

      {selectedImage && (
        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postButtonText}>Share</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const DefaultProfileImage = () => {
  return <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/car-project-b12f9.appspot.com/o/PostImage%2Fcyber_punk.jpg?alt=media&token=5b6b1f18-d20d-4bdf-a9cb-b1f35a75408e' }} style={styles.profileImage} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15, 
  },
  headerBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: Platform.OS == 'ios' ? 5 : 30,
    paddingVertical: Platform.OS == 'ios' ? 40 : 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    justifyContent: 'center',
    backgroundColor: 'white', // Header background color
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '20%',
    marginBottom: 16,
  },
  profileImage: {
    top: 20,
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: '#ff8501',
  },
  username: {
    color: '#333363',
    marginLeft: 5,
    fontWeight: '700',
    top: 30,
  },
  input: {
    top: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: '100%',
  },
  postButton: {
    top: 20, 
    backgroundColor: '#faca63',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#333363',
    fontWeight: 'bold',
  },
  selectedImage: {
    width: '95%',
    height: '70%',
    alignSelf: 'center',
    marginTop: 50,
  },
});

export default CreatePostScreen;

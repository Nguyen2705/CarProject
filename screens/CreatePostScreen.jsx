import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  RefreshControl, 
  ScrollView,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, firestore, storage } from '../firebase';
import { ref, getDownloadURL } from "firebase/storage";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { FontAwesome, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const CreatePostScreen = () => {
  const [caption, setCaption] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // New state for selected image
  const [username, setUsername] = useState('');
  const [imageURL, setImageURL] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const navigation = useNavigation();
  const db = firebase.firestore();

  const [refreshing, setRefreshing] = useState(false);

  const fetchUserData = async (uid) => {
    const userRef = db.collection('users').doc(uid);
    try {
        const doc = await userRef.get();
        if (doc.exists) {
            setUsername(doc.data().username);
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const loadUserProfile = async () => {
        const user = auth.currentUser;
        if (user) {
            const userRef = doc(firestore, 'users', user.uid);
            const docSnap = await getDoc(userRef);

            if (docSnap.exists()) {
                setUsername(docSnap.data().username);
            } else {
                // Document does not exist
                Alert.alert('Error', 'User data not found.');
            }
        }
    };

    loadUserProfile();
  }, []);

  useEffect(() => {
    if (currentUser) {
        fetchUserData(currentUser.uid);
    }
  }, [currentUser]);

  const fetchImageURL = async (uid) => {
    const storageRef = ref(storage, `profileImage/${uid}`);
      const url = await getDownloadURL(storageRef);
      setImageURL(url);
  };

  const unsubscribe = auth.onAuthStateChanged((user) => {
    setCurrentUser(user);
    if (user) {
      fetchUserData(user.uid);
      fetchImageURL(user.uid);
    }
  });

  useEffect(() => {
    if (selectedImage) {
      console.log('Selected image:', selectedImage);
    }
    }, [selectedImage]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchUserData(currentUser.uid);

    await fetchImageURL(currentUser.uid);
  
    setRefreshing(false);
  }, [currentUser]);
    
  const handlePost = async () => {
    if (!currentUser) {
      console.error('Current user is null.');
      return;
    }

    try {
      console.log('Selected image:', selectedImage);
  
      if (!selectedImage) {
        Alert.alert('Error', 'Please select an image before posting.');
        return;
      }
  
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  
      // Generate a unique post ID
      const postId = `${currentUser.uid}_${Math.random().toString(36).substr(2, 9)}`;
  
      const imageRef = storage.ref().child(`posts/${postId}.jpg`);
  
      // Upload the image to Firebase Storage
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      await imageRef.put(blob);
  
      const postRef = await db.collection('posts').doc(postId).set({
        uid: currentUser.uid, 
        username: username, 
        userImage: imageURL, 
        postId: postId, 
        image: await imageRef.getDownloadURL(),
        caption: caption,
        timestamp: timestamp,
        comments: [],
        likes: 0,
      });

       // Update the user's document to increment the post count
      const userDocRef = doc(firestore, 'users', currentUser.uid);
      await updateDoc(userDocRef, { posts: firebase.firestore.FieldValue.increment(1) });
    
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
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.canceled) {
        // Use the assets array instead of uri
        const selectedAsset = result.assets[0];
        setSelectedImage(selectedAsset.uri);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  }
    >
      <View style={styles.headerBackground}>
        <Text 
            style={{
                top: Platform.OS == 'ios' ? 20 : 5,
                fontSize: 18,
                fontWeight: 'bold',
                color: '#333363', // Header text color
        }}>Create Post</Text>
      </View>

      <View style={styles.header}>
        {currentUser && (
          <>
            <Image 
              source={{ uri: imageURL || 'https://firebasestorage.googleapis.com/v0/b/car-project-b12f9.appspot.com/o/profileImage%2Fdefault.png?alt=media&token=e2443c3b-fc13-4eff-8533-e7c6504dc737'}} 
              style={styles.profileImage} />

            <Text style={styles.username}> {`${username}`} </Text>
          </>
        )}
      </View>


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
    // </TouchableWithoutFeedback>
  );
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
    marginBottom: Platform.OS == 'ios' ? 0 : -20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '20%',
    marginBottom: 16,
  },
  profileImage: {
    top: Platform.OS == 'ios' ? 0 :-20,
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
    top: Platform.OS == 'ios' ? 10 : -10,
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
    position: 'absolute', // Use absolute positioning
    bottom: Platform.OS == 'ios' ? 370 : 350, // Distance from the bottom of the screen
    left: 0, // Align to the left side of the screen
    right: 0, // Align to the right side of the screen
    backgroundColor: '#faca63',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    alignSelf: 'center', // Center horizontally
  },
  postButtonText: {
    color: '#333363',
    fontWeight: 'bold',
  },
  selectedImage: {
  width: '100%',
  top: 50,
  height: undefined, // This will maintain the aspect ratio
  aspectRatio: 1 / 1, // You can change this based on your needs
  alignSelf: 'center',
  resizeMode: 'contain', // Or 'cover', based on how you want the image to fit
},
});

export default CreatePostScreen;

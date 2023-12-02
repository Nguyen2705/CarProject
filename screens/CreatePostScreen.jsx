import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { auth, firestore, storage } from '../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { FontAwesome, Feather } from '@expo/vector-icons';
// import ImagePicker from 'react-native-image-crop-picker';

const CreatePostScreen = () => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
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

  const handleChooseFromLibrary = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
  
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImage(response.uri);
      }
    });
  };
  
  const handleTakePhoto = () => {
    const options = {
      title: 'Take Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
  
    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImage(response.uri);
      }
    });
  };

  const handlePost = async () => {
    try {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        throw new Error('User not signed in');
      }

    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    const postRef = await db.collection('posts').add({
      image: image,
      caption: caption,
      timestamp: timestamp,
      userId: user.uid,
      userName: user.displayName,
      userImage: user.photoURL,
      numOfComments: 0, 
      comments: [], 
      likes: 0, 
    });

    console.log('Post created with ID:', postRef.id);

    setCaption('');
    Alert.alert('Success', 'Post created successfully!');
    } catch (error) {
    console.error('Error creating post:', error.message);
    Alert.alert('Error', 'Failed to create post. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
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
          <Text style={styles.username}>{user.displayName}</Text>
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Write a caption..."
        value={caption}
        onChangeText={(text) => setCaption(text)}
      />

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => {navigation.navigate('Library')}}>
          <FontAwesome name="photo" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate('Camera')}}>
          <Feather name="camera" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Button title="Post" onPress={handlePost} />
    </View>
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
});

export default CreatePostScreen;

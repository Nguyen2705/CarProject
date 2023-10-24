import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import Post from '../navigation/Post';
import { useNavigation } from '@react-navigation/core';
import { auth } from '../firebase';
import Ionicons from '@expo/vector-icons/Ionicons';
import Header from '../navigation/Header';


// test case for profile
const User = [
  {
    username: 'khoinguyen',
    image: require('../assets/cyper_punk.jpg'), 
  }
];

const testPost = [
  {
    username: User[0].username, 
    imageUrl: require('../assets/cyper_punk.jpg'), 
    likes: 12431, 
    caption: 'Back to HomeTown', 
    profile_picture: User[0].image, 
    comments: [
        {
            username: 'khoinguyen', 
            comment: 'Wow', 
        }, 
        {
          username: 'khoinguyen', 
          comment: 'Wow', 
        }, 
        {
          username: 'khoinguyen', 
          comment: 'Wow', 
        }, 
    ],
  },

  {
    username: User[0].username, 
    imageUrl: require('../assets/cyper_punk.jpg'), 
    likes: 12431, 
    caption: 'Back to HomeTown', 
    profile_picture: User[0].image, 
    comments: [
        {
            username: 'khoinguyen', 
            comment: 'Wow', 
        }, 
    ],
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch((error) => alert(error.message));
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <View style={styles.container}>
      {/* Header with Logo */}
      {/* <View style={styles.header}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image source={require('../assets/logo2.png')} style={styles.logo} />
        </View> */}
        {/* New Message Button */}
        {/* <View style={styles.headerRight}>
          <TouchableOpacity onPress={toggleMenu} style={styles.userProfileButton}>
            <Ionicons name="person-circle-outline" size={35} color="#333363" />
          </TouchableOpacity>
          {menuVisible && (
            <View style={styles.profileMenu}>
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Text style={styles.profileMenuItem}>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSignOut}>
                <Text style={styles.signOutMenuItem}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View> */}

      {/* Chat Button */}
      {/* <TouchableOpacity onPress={() => navigation.navigate('Chat')} style={styles.newMessageButton}>
        <Ionicons name="chatbubbles-outline" size={30} color="#333363" />
      </TouchableOpacity> */}

      {/* Content */}
      {/* <View style={styles.content}>
        <Text style={styles.emailText}>Email: {auth.currentUser?.email}</Text>
        {/* Add your car social media content here */}
      {/* </View> */}
      
      <View style={styles.headerBackground}> 
          <Header />
      </View>   

      {/* Display all post */}
      <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {/* Render the test post */}
          {testPost.map((post, index) => (
            <Post post={post} key={index} />
          ))}
        </ScrollView>
      </SafeAreaView>
      </GestureHandlerRootView>

      {/* Footer */}
      {/* <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.replace('Home')} style={styles.footerButton}>
          <Ionicons name="home" size={24} color="#333363" />
          <Text style={styles.footerButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.footerButton}>
          <Ionicons name="search" size={24} color="#333363" />
          <Text style={styles.footerButtonText}>Search</Text>
        </TouchableOpacity> */}
        {/* Add your New Post button here */}
        {/* <TouchableOpacity onPress={() => {}} style={styles.newPostButton}>
          <Ionicons name="add-circle" size={80} color="#faca63" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.footerButton}>
          <Ionicons name="notifications" size={24} color="#333363" />
          <Text style={styles.footerButtonText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.footerButton}>
          <FontAwesome name="map" size={24} color="#333363" />
          <Text style={styles.footerButtonText}>Map</Text>
        </TouchableOpacity>
      </View> */}
    </View> 
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    justifyContent: 'space-between',
  },
  headerBackground: {
    backgroundColor: 'white',
    paddingVertical: 15, 
    paddingHorizontal: 18, 
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  logo: {
    width: 45,
    height: 45,
    marginTop: 45,
    marginLeft: 45,
  },
  userProfileButton: {
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
    marginTop: 45,
  },
  logoStyle: {
    height: 30,
    width: 30,
    marginTop: 10,
    marginLeft: 23,
  },
  profileMenu: {
    position: 'absolute',
    top: 30,
    right: 45,
    backgroundColor: '#faca63',
    borderRadius: 10,
    padding: 1,
  },
  profileMenuItem: {
    fontSize: 18,
    color: '#333363',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333363',
  },

  signOutMenuItem: {
    fontSize: 18,
    color: '#333363',
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emailText: {
    fontSize: 16,
    marginBottom: 20,
  },
  newMessageButton: {
    position: 'absolute',
    marginTop: 60,
    marginLeft: 10,
    padding: 5,
    borderRadius: 20,
    alignItems: 'center',
  },
  signOutButtonText: {
    color: '#333363',
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'flex-end',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingVertical: 10,
  },
  footerButton: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
  footerButtonText: {
    color: '#333363',
    fontSize: 12,
    fontWeight: 'bold',
  },
  newPostButton: {
    alignItems: 'center',
    marginTop: -10,
    bottom: 23,
  },
});



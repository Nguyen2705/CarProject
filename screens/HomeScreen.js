import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { auth } from '../firebase';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import BottomTab from '../navigation/BottomTabBar';

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
    <>
      <View style={styles.container}>
        {/* Header with Logo */}
        <View style={styles.header}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image source={require('../assets/logo2.png')} style={styles.logo} />
          </View>
          {/* New Message Button */}
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={toggleMenu} style={styles.userProfileButton}>
              <Ionicons name="person-circle-outline" size={35} color="#333363" />
            </TouchableOpacity>
            {menuVisible && (
              <View style={styles.profileMenu}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.profileMenuItem}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSignOut}>
                  <Text style={styles.profileMenuItem}>Sign Out</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* User Profile Button */}
        <TouchableOpacity onPress={() => {}} style={styles.newMessageButton}>
          <Ionicons name="chatbubbles-outline" size={30} color="#333363" />
        </TouchableOpacity>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.emailText}>Email: {auth.currentUser?.email}</Text>
          {/* Add your car social media content here */}
        </View>

        {/* Footer */}
        {/*<View style={styles.footer}>
          <TouchableOpacity onPress={() => navigate.replace('Home')} style={styles.footerButton}>
            <Ionicons name="home" size={24} color="#333363" />
            <Text style={styles.footerButtonText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.footerButton}>
            <Ionicons name="search" size={24} color="#333363" />
            <Text style={styles.footerButtonText}>Search</Text>
          </TouchableOpacity>
          {/* Add your New Post button here */}
          {/* <TouchableOpacity onPress={() => {}} style={styles.newPostButton}>
            <Ionicons name="add-circle" size={80} color="#faca63" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.footerButton}>
            <Ionicons name="notifications" size={24} color="#333363" />
            <Text style={styles.footerButtonText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate.replace('Map')} style={styles.footerButton}>
            <FontAwesome name="map" size={24} color="#333363" />
            <Text style={styles.footerButtonText}>Map</Text>
          </TouchableOpacity>
        </View> */}
      </View>
      <BottomTab/>
    </>
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
    borderBottomWidth: 1,
    borderBottomColor: '#333363',
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

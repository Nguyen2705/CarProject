import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { auth } from '../firebase';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      {/* Header with Logo */}
      <View style={styles.header}>
        <Image source={require('../assets/logo2.png')} style={styles.logo} />
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => {}} style={styles.newMessageButton}>
            <Ionicons name="chatbubbles-outline" size={30} color="#333363" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.emailText}>Email: {auth.currentUser?.email}</Text>
        {/* Add your car social media content here */}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => {}} style={styles.footerButton}>
          <Ionicons name="home" size={24} color="#333363" />
          <Text style={styles.footerButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.footerButton}>
          <Ionicons name="search" size={24} color="#333363" />
          <Text style={styles.footerButtonText}>Search</Text>
        </TouchableOpacity>
        {/* Add your New Post button here */}
      <TouchableOpacity onPress={() => {}} style={styles.newPostButton}>
        <Ionicons name="add-circle" size={75} color="#faca63" />
      </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.footerButton}>
          <Ionicons name="notifications" size={24} color="#333363" />
          <Text style={styles.footerButtonText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.footerButton}>
          <FontAwesome name="map" size={24} color="#333363" />
          <Text style={styles.footerButtonText}>Map</Text>
        </TouchableOpacity>
      </View>

      {/* Sign Out Button */}
      <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
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
    justifyContent: 'space-between', // Add this to align the message button to the right
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  logo: {
    width: 45,
    height: 45,
    alignSelf: 'flex-start',
    marginTop: 45,
    marginLeft: 25,
  },
  newMessageButton: {
    backgroundColor: '#faca63',
    padding: 5,
    borderRadius: 10,
    marginTop: 45,
    marginRight: 5,
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
  },
  footerButtonText: {
    color: '#333363',
    fontSize: 12,
    fontWeight: 'bold',
  },
  newPostButton: {
    alignItems: 'center',
  },
  signOutButton: {
    backgroundColor: '#faca63',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
  },
  signOutButtonText: {
    color: '#333363',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

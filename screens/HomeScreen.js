import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { auth } from '../firebase';

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
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../assets/logo.jpg')}
          style={styles.logo}
        />
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={() => {}} style={styles.headerButton}>
            <Text style={styles.headerButtonText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.headerButton}>
            <Text style={styles.headerButtonText}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.headerButton}>
            <Text style={styles.headerButtonText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.headerButton}>
            <Text style={styles.headerButtonText}>Map</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.emailText}>Email: {auth.currentUser?.email}</Text>
        {/* Add your car social media content here */}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  logo: {
    width: 100,
    height: 100,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    marginLeft: 20,
  },
  headerButtonText: {
    color: '#0782F9',
    fontSize: 16,
    fontWeight: 'bold',
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
  signOutButton: {
    backgroundColor: '#0782F9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
  },
  signOutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

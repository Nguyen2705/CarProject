import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Platform,
} from 'react-native';
import { auth, firestore } from '../firebase';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const navigation = useNavigation();

  const KeyboardAvoidingBehavior = Platform.OS === 'ios' ? 'padding' : undefined;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace('Home');
      }
    });

    return unsubscribe;
  }, []);

  const generateRandomUsername = () => {
    return `user${Math.random().toString(36).substring(2, 8)}`;
  };

  const handleSignUp = async () => {
    try {
      const authUser = await auth.createUserWithEmailAndPassword(email, password);
      const randomizedUsername = generateRandomUsername();
      const defaultProfileImage = 'https://firebasestorage.googleapis.com/v0/b/car-project-b12f9.appspot.com/o/profileImage%2Fdefault.png?alt=media&token=e2443c3b-fc13-4eff-8533-e7c6504dc737';

      await authUser.user.updateProfile({
        displayName: randomizedUsername,
        photoURL: defaultProfileImage,
      });

      const user = {
        uid: authUser.user.uid,
        email: authUser.user.email,
        firstName: firstName,
        lastName: lastName,
        username: randomizedUsername,
        profileImage: defaultProfileImage,
        followers: 0, 
        following: 0, 
        posts: 0, 
      };

      await firestore.collection('users').doc(authUser.user.uid).set(user);

      return user;
    } catch (error) {
      throw error;
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={KeyboardAvoidingBehavior}
      enabled={Platform.OS === 'ios'}
    >
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo2.png')} style={styles.logo} />
        <Text style={styles.logoText}>CARVO</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          style={styles.input}
          placeholderTextColor="#B0B0B0"
        />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          style={styles.input}
          placeholderTextColor="#B0B0B0"
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          placeholderTextColor="#B0B0B0"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
          placeholderTextColor="#B0B0B0"
        />
      </View>
      <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.loginInContainer}>
        <Text style={styles.loginText}>
          Already have an account?
          <TouchableOpacity
            onPress={() => navigation.replace('Login')}
            style={styles.loginInContainer}
          >
            <Text style={styles.loginInContainer}> Login</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen; 

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    logoContainer: {
        alignItems: 'center', 
        marginBottom: 30,
    },  
    logo: {
        width: 120, 
        height: 120,
    }, 
    logoText: {
        fontSize: 24, 
        fontWeight: 'bold', 
        marginTop: 10,
        textAlign: 'center',
    },
    inputContainer: {
        width: 345,
    },
    input: {
        backgroundColor: '#F0F0F0',
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 10,
        marginTop: 10,
        fontSize: 16,
        color: '#333',
    },
    signUpButton: {
        backgroundColor: '#333363',
        width: 345,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    signUpButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    loginInContainer: {
        fontWeight: 'bold',
        color: '#faca63', 
        fontSize: 12, 
        alignItems: 'center',
    },
    loginText: {
        marginTop: 20,
        color: 'black', 
        fontSize: 12, 
        alignItems: 'center',
    }
}); 

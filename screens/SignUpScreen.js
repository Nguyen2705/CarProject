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
} from 'react-native';
import { auth } from '../firebase';

const SignUpScreen = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [lastName, setLastName] = useState(''); 
    const [firstName, setFirstName] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            navigation.replace('Home');
          }
    });

    return unsubscribe; 
    }, []); 

    const handleSignUp = () => {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then((userCredentials) => {
            const user = userCredentials.user;
            console.log('Registered with:', user.email);
          })
          .catch((error) => alert(error.message));
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/logo1.jpg')}
              style={styles.logo}
            />
            <Text style={styles.logoText}>CARVO</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder='Last Name'
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              style={styles.input}
              placeholderTextColor='#B0B0B0'
            />
            <TextInput
              placeholder='FirstName'
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              style={styles.input}
              placeholderTextColor='#B0B0B0'
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
          {/* <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
          <View style={styles.orContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.line} />
          </View> */}
          <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.loginInContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.replace("Login")} style={styles.loginInContainer}>
                <Text style={styles.loginInContainer}>Login</Text>
            </TouchableOpacity>
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
        backgroundColor: 'yellow',
    },
    logocontainer: {
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
    },
    signUpButton: {
    backgroundColor: '#42B72A',
    width: '80%',
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
    color: 'black', 
    fontSize: 12, 
    },
    loginText: {
        color: 'black', 
        fontSize: 12, 
    }
}); 
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
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState(''); 
    

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            navigation.replace("Home");
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
          .catch((error) => alert(error.message = "Invalid Email or Password"));
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/logo2.png')}
              style={styles.logo}
            />
            <Text style={styles.logoText}>CARVO</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder='First Name'
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              style={styles.input}
              placeholderTextColor='#B0B0B0'
            />
            <TextInput
              placeholder='Last Name'
              value={lastName}
              onChangeText={(text) => setLastName(text)}
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
          <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.loginInContainer}>
            <Text style={styles.loginText}>Already have an account? 
            <TouchableOpacity onPress={() => navigation.replace("Login")} style={styles.loginInContainer}>
                <Text style={styles.loginInContainer}> Login</Text>
            </TouchableOpacity></Text>
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

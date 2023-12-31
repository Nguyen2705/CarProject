import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

const WelcomeScreen = () => {
    const navigation = useNavigation(); 

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.logocontainer}>
                <Image
                    source={require('../assets/gif.gif')}
                    style={styles.logo}
                />
                <Text style={styles.logoText}>WELCOME TO CARVO</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>
            <View style={styles.orContainer}>
                <View style={styles.line}/>
                <Text style={styles.orText}>OR</Text>
                <View style={styles.line}/>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.signUpButton}>
                <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    ); 
};

export default WelcomeScreen; 

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#faca63',
    },
    logocontainer: {
        alignItems: 'center', 
        marginBottom: 30,
    },  
    logo: {
        width: 500, 
        height: 300, 
    }, 
    logoText: {
        fontSize: 24, 
        fontWeight: 'bold', 
        marginTop: 10,
    },
    loginButton: {
        backgroundColor: '#333363',
        width: 300,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    loginButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    },
    line: {
    width: 100,
    height: 1,
    backgroundColor: 'black',
    },
    orText: {
    marginHorizontal: 10,
    color: '#808080',
    fontWeight: 'bold',
    },
    signUpButton: {
    backgroundColor: '#333363',
    width: 300,
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
}); 


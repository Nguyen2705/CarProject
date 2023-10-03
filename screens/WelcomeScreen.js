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
                    source={require('../assets/logo1.jpg')}
                    style={styles.logo}
                />
                <Text style={styles.logoText}>CARVO</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.replace('Login')} style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>
            <View style={styles.orContainer}>
                <View style={styles.line}/>
                <Text style={styles.orText}>OR</Text>
                <View style={styles.line}/>
            </View>
            <TouchableOpacity onPress={() => navigation.replace('Login')} style={styles.signUpButton}>
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
    loginButton: {
        backgroundColor: '#1877F2',
        width: '80%',
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
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5E5',
    },
    orText: {
    marginHorizontal: 10,
    color: '#808080',
    fontWeight: 'bold',
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
}); 


import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../firebase'; // Import the 'auth' object from your firebase.js file

const ProfileScreen = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Retrieve user information from Firebase Authentication
        const currentUser = auth.currentUser;
        if (currentUser) {
            setUser({
                name: currentUser.displayName,
                photoURL: currentUser.photoURL,
                bio: 'Software Developer', // You can replace this with the user's bio if available
            });
        }
    }, []);

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
                    <Ionicons name="chevron-back-outline" size={30} color="#333363" />
                </TouchableOpacity>
                {user && (
                    <>
                        <Image
                            style={styles.avatar}
                            source={{ uri: user.photoURL }}
                        />
                        <Text style={styles.name}>{user.name}</Text>
                        <Text style={styles.bio}>{user.bio}</Text>
                    </>
                )}
            </View>
            <View style={styles.stats}>
                <View style={styles.stat}>
                    <Text style={styles.statNumber}>3</Text>
                    <Text style={styles.statTitle}>Posts</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statNumber}>1.5K</Text>
                    <Text style={styles.statTitle}>Followers</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statNumber}>200</Text>
                    <Text style={styles.statTitle}>Following</Text>
                </View>
            </View>
            <View style={styles.photos}>
                <Image
                    style={{...styles.photo, width: '32%', height: '70%'}}
                    source={{ uri: 'https://utatickets.com/_img/venues/college-park-center.jpg' }}
                />
                <Image
                    style={{...styles.photo, width: '32%', height: '70%'}}
                    source={{ uri: 'https://pa-hrsuite-production.s3.amazonaws.com/2918/docs/457749.jpg' }}
                />
                <Image
                    style={{...styles.photo, width: '32%', height: '70%'}}
                    source={{ uri: 'https://www.star-telegram.com/latest-news/6eav0b/picture240316926/alternates/FREE_1140/Heart%20of%20Arlington%20neighborhood%2013.JPG' }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        alignItems: 'center',
        marginTop: 50,
    },
    avatar: {
        marginTop: 10,
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    bio: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 30,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
    },
    stat: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    statTitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    photos: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingHorizontal: 10,
    },
    photo: {
        aspectRatio: 1,
        marginBottom: 10,
    },
    goBackButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 2,
    },
});

export default ProfileScreen;

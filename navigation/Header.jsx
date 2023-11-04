import React, { useState} from 'react'; 
import { auth } from '../firebase';
import { View, Text, Image,StyleSheet, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/core'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Header = () => {
    const navigation = useNavigation(); 
    const [menuVisible, setMenuVisible] = useState(false);

    // Menu slide for sign-out button and profile edit
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    // Handle sign out
    const handleSignOut = () => {
        auth
          .signOut()
          .then(() => {
            navigation.replace('Login');
          })
          .catch((error) => alert(error.message));
    };

    return (
    // Header Logo
        <>
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
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image source={require('../assets/logo3.png')} style={styles.logoStyle} />
                </TouchableOpacity>    
                    <Text style= {{ 
                        flexDirection: 'row', 
                        justifyContent: 'space-between', 
                        marginTop: 20, 
                        marginLeft: 10, 
                        fontWeight: 500, 
                        color: '#333363', 
                        fontFamily: ''
                        }}>CARVO</Text>
            </View>    

            <View style={styles.headerRight}>
                {/* Chat Button */}
                <TouchableOpacity onPress={() => navigation.navigate('Chat')} >
                    <Ionicons name='chatbubbles-outline' size={25} style={styles.iconStyle} />
                </TouchableOpacity>
                {/* User Profile Button */}
                <TouchableOpacity onPress={toggleMenu}>
                    <FontAwesome name='user-circle' size={24} style={styles.iconStyle} />
                </TouchableOpacity>
                {menuVisible && (
                <View style={styles.profileMenu}>                
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>                  
                        <Text style={styles.profileMenuItem}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSignOut}>
                        <Text style={styles.profileMenuItem}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
                )}
            </View>
        </>
    );    
};

export default Header; 

const styles = StyleSheet.create({
    logoStyle: {
        height: 30,
        width: 30,
        marginTop: 10,
        marginLeft: -2,
    },
    headerBackground: {
        marginTop: 10, 
        backgroundColor: 'white',
        paddingVertical: 9, 
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },
    iconStyle: {
        paddingHorizontal: 15,
        marginTop: 10,
        color: '#333363', 
    }, 
    profileMenu: {
        position: 'absolute',
        top: 30,
        right: 45,
        backgroundColor: '#faca63',
        borderRadius: 10,
        padding: 10,
    },
    profileMenuItem: {
        fontSize: 18,
        color: '#333363',
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#333363',
        padding: 10,
    },
    headerRight: {
        marginTop: 10, 
        flexDirection: 'row',
        alignItems: 'center',
        width: 100, 
        justifyContent: 'space-between'
    },
});

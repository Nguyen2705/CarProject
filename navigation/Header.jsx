import React from 'react'; 
import { View, Text, Image,StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Header = () => {
    const navigation = useNavigation(); 

    return (
        <>
        {/* Header Logo */}
            <View style={styles.headerBackground}> 
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image source={require('../assets/logo3.png')} style={styles.logoStyle} />
                </TouchableOpacity>    
                    <Text style= {{ 
                        flexDirection: 'row', 
                        justifyContent: 'space-between', 
                        marginTop: 50, 
                        marginLeft: 10, 
                        fontWeight: 500, 
                        color: '#333363', 
                        fontFamily: '',
                        fontWeight: 'bold',
                        }}>CARVO</Text>
            </View>    

            <View style={styles.headerRight}>
                {/* Chat Button */}
                <TouchableOpacity onPress={() => navigation.navigate('Chat')} >
                    <Ionicons name='chatbubbles-outline' size={25} style={styles.iconStyle} />
                </TouchableOpacity>
                {/* User Profile Button */}
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <FontAwesome name='user-circle' size={24} style={styles.iconStyle} />
                </TouchableOpacity>
            </View>
        </>
    );    
};

export default Header; 

const styles = StyleSheet.create({
    logoStyle: {
        height: 35,
        width: 35,
        marginTop: 40,
        marginLeft: -2,
    },
    headerBackground: {
        marginTop: Platform.OS == 'ios' ? 15 : -40, 
        backgroundColor: 'white',
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },
    iconStyle: {
        paddingHorizontal: 15,
        marginTop: 40,
        color: '#333363', 
    }, 
    headerRight: {
        marginTop: Platform.OS == 'ios' ? 10 : -40, 
        flexDirection: 'row',
        alignItems: 'center',
        width: 100, 
        justifyContent: 'space-between'
    },
});

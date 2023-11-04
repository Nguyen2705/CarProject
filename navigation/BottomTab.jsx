import React, {useState} from 'react'; 
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Divider } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

export const bottomTabIcons = [
    {
        name: 'New', 
        active: <Ionicons name="md-home" size={25} color="#333363" />,
        inactive: <Ionicons name="md-home-outline" size={25} color="#333363" />,  
    },
    {
        name: 'Search', 
        active: <Ionicons name="ios-search" size={25} color="#333363" />,
        inactive: <Ionicons name="search-outline" size={25} color="#333363" />,
    }, 
    {
        name: 'Post',
        active: (
            <Ionicons
            name="add-circle"
            size={70}
            color="#faca63"
            style={{ flex: 1, marginVertical: -40 }} // Adjust for the New Post Button
            // marginVertical: -40,
            //...(Platform.OS === 'android' ? { marginTop: -10 } : {}), // Adjust the marginTop for Android
            />
        ),
        inactive: (
            <Ionicons
            name="add-circle"
            size={70}
            color="#faca63"
            style={{ flex: 1, marginVertical: -40 }}
            />
        ),
    },
    {
        name: 'Notification', 
        active: <Ionicons name="ios-notifications" size={25} color="#333363" />,
        inactive: <Ionicons name="notifications-outline" size={25} color="#333363" />,
    }, 
    {
        name: 'Map', 
        active: <Ionicons name="ios-map" size={25} color="#333363" />, 
        inactive: <Ionicons name="ios-map-outline" size={25} color="#333363" />, 
    }
]
const BottomTab = ({ icons, navigation }) => {
    const [activeTab, setActiveTab] = useState('New')
    const navigation = useNavigation(); 

    const handleTabPress = (name) => {
        setActiveTab(name); 
        // Navigate to the corresponding screen
        navigation.navigate(name); 
    }

    const Icon = ({ icon }) => (
        <TouchableOpacity onPress={() => handleTabPress(icon.name)}>
          {activeTab === icon.name ? icon.active : icon.inactive}
        </TouchableOpacity>
    );

    return (
        <View style={styles.wrapper} > 
        <Divider width={1} orientation='vertical' />
            <View style={styles.container}>
                {icons.map((icon, index) => (
                    <Icon key={index} icon={icon} />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
    wrapper: {
        position: 'absolute',
        width: '100%', 
        bottom: '3%', 
        zIndex: 999, 
        backgroundColor: 'white'
    }, 
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 40,
    }, 
})

export default BottomTab; 
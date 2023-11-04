import React, {useState} from 'react'; 
import { View } from 'react-native';
// import { Divider } from 'react-native-elements';
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
const BottomTab = ({ icons }) => {
    const [activeTab, setActiveTab] = useState('New')

    const Icon = ({ icon }) => (
        <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
          {activeTab === icon.name ? icon.active : icon.inactive}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {icons.map((icon, index) => (
                <Icon key={index} icon={icon} />
            ))}
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 40,
    }, 
})

export default BottomTab; 
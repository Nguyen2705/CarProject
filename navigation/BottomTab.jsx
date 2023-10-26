import React, {useState} from 'react'; 
import { View, Text } from 'react-native';
import { Divider } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

//                 },
//                 })}>
//                 <Tab.Screen name='Home' component={HomeScreen} />
//                 <Tab.Screen name='Search' component={HomeScreen} />
//                 <Tab.Screen name='Notification' component={HomeScreen} />
//                 <Tab.Screen name='Map' component={HomeScreen} />
//             </Tab.Navigator>
//         </NavigationContainer>
//     ); 
// }; 

// export default BottomTab; 
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
            style={{ marginVertical: -30 }}
            />
        ),
        inactive: (
            <Ionicons
            name="add-circle"
            size={70}
            color="#faca63"
            style={{ marginVertical: -30 }}
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
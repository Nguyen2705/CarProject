import React, {useState} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';

// Import your screen components
import HomeScreen from './screens/HomeScreen'
import SearchScreen from './screens/SearchScreen'
import NotificationScreen from './screens/NotificationScreen';
import MapScreen from './screens/MapScreen';
import CreatePostScreen from './screens/CreatePostScreen'

const Tab = createBottomTabNavigator();

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

const BottomTabNavigator = () => {
    const [activeTab, setActiveTab] = useState('New')

    const Icon = ({ icon }) => (
        <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
          {activeTab === icon.name ? icon.active : icon.inactive}
        </TouchableOpacity>
        
    );

    return (
        <Tab.Navigator>
          <Tab.Screen
            name="New"
            component={HomeScreen}
            options={{
              tabBarLabel: 'New',
              tabBarShowLabel: false, 
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Icon icon={bottomTabIcons[0]} />
              ),
            }}
          />
          <Tab.Screen
            name="Search"
            component={SearchScreen}
            options={{
              tabBarLabel: 'Search',
              tabBarShowLabel: false, 
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Icon icon={bottomTabIcons[1]} />
              ),
            }}
          />
          <Tab.Screen
            name="Post"
            component={CreatePostScreen}
            options={{
              tabBarLabel: 'Post', 
              tabBarShowLabel: false,
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Icon icon={bottomTabIcons[2]} />
              ),
            }}
          />
          <Tab.Screen
            name="Notification"
            component={NotificationScreen}
            options={{
              tabBarLabel: 'Notification',
              tabBarShowLabel: false, 
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Icon icon={bottomTabIcons[3]} />
              ),
            }}
          />
          <Tab.Screen
            name="Map"
            component={MapScreen}
            options={{
              tabBarLabel: 'Map',
              tabBarShowLabel: false, 
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Icon icon={bottomTabIcons[4]} />
              ),
            }}
          />
        </Tab.Navigator>
    );  

};

export default BottomTabNavigator;

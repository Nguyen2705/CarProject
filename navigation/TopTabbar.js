import React from 'react'; 
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Chat from '../screens/ChatScreen';
// import HomeScreen from './screens/HomeScreen'; 
// import SearchScreen from './screens/SearchScreen'; 
// import NotificationScreen from './screens/NotificationScreen';
// import MapScreen from './screens/MapScreen';
// import HomeScreen from '../screens/HomeScreen';

const Tab = createMaterialTopTabNavigator(); 

const TopTabbar = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Chat" component={Chat} />
        </Tab.Navigator>
    )
}; 

export default TopTabbar; 
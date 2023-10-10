import React from 'react'; 
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeScreen from './screens/HomeScreen'; 
// import SearchScreen from './screens/SearchScreen'; 
// import NotificationScreen from './screens/NotificationScreen';
// import MapScreen from './screens/MapScreen';
// import HomeScreen from '../screens/HomeScreen';

const Tab = createMaterialTopTabNavigator(); 

const TopTabbar = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Search" componet={SearchScreen} />
            <Tab.Screen name="Notification" componet={NotificationScreen} />
            <Tab.Screen name="Map" componet={MapScreen} /> 
        </Tab.Navigator>
    )
}; 

export default TopTabbar; 
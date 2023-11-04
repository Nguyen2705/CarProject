import React from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { bottomTabIcons } from '../navigation/BottomTab';
// import all the corresponding tab
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import NotificationScreen from '../screens/NotificationScreen';
import MapScreen from '../screens/MapScreen';

// Create a stack navigator for a Home Tab
const HomeStack = createStackNavigator(); 
const HomeStackScreen = () => (
    <HomeStack.Navigator>
        <HomeStack.Screen name = "Home" component={HomeScreen} /> 
    </HomeStack.Navigator>
); 

// Create a bottom tab navigator
const Tab = createBottomTabNavigator(); 


const TabNavigation = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({ }) => {
                        const icon = bottomTabIcons.find((item) => item.name == route.name); 
                        return icon.active; 
                    },
                })}
            >
                <Tab.Screen name='Home' component={HomeStackScreen} />
                <Tab.Screen name='Search' component={SearchScreen} />
                <Tab.Screen name='Notification' component={NotificationScreen} />
                <Tab.Screen name='Map' component={MapScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    ); 
}; 

export default TabNavigation; 
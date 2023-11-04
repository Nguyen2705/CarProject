import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SignUpScreen from './screens/testSignup';
import ChatScreen from './screens/ChatScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import CameraScreen from './backend/camera';
import LibraryScreen from './backend/library';
import SearchScreen from './screens/SearchScreen';
import NotificationScreen from './screens/NotificationScreen';
import MapScreen from './screens/MapScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator(); 

const MainStack = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Welcome" component={WelcomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUpScreen} /> 
        <Stack.Screen options={{ headerShown: false }} name="Home" component={TabNavigation} />
        <Stack.Screen options={{ headerShown: false }} name="Chat" component={ChatScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Profile" component={ProfileScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Camera" component={CameraScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Library" component={LibraryScreen} /> 
      </Stack.Navigator>
  );
}


const App = () => {
  return (
    <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen options={{ headerShown: false }} name='New' component={HomeScreen} />
            <Tab.Screen options={{ headerShown: false }} name='Search' component={SearchScreen} />
            <Tab.Screen options={{ headerShown: false }} name='Notification' component={NotificationScreen} />
            <Tab.Screen options={{ headerShown: false }} name='Map' component={MapScreen} />
        </Tab.Navigator>
    </NavigationContainer>
  ); 
}

export default App; 

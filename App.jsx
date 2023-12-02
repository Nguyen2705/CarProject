import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SignUpScreen from './screens/testSignup';
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';
import CameraScreen from './backend/camera';
import LibraryScreen from './backend/library';
import PostLibraryScreen from './backend/postLibrary';
import BottomTabNavigator from './BottomTabNavigator';
import BioScreen from './screens/BioScreen'; 
import { StatusBar } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native';


const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator(); 

const Home = () => {
  return (
    <SafeAreaView>
      <BottomTabNavigator /> 
    </SafeAreaView>
  );
}


const App = () => {
  return (
    <>
      {/* Set the status bar background color */}
      <StatusBar barStyle="dark-content" backgroundColor="black" />
    <GestureHandlerRootView style={{ flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Welcome" component={WelcomeScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUpScreen} /> 
          <Stack.Screen options={{ headerShown: false }} name="Home" component={BottomTabNavigator} /> 
          <Stack.Screen options={{ headerShown: false }} name="Chat" component={ChatScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Profile" component={ProfileScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Camera" component={CameraScreen} />
          <Stack.Screen options={{ headerShown: false }} name="PostLibrary" component={PostLibraryScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Library" component={LibraryScreen} /> 
          <Stack.Screen options={{ headerShown: false }} name="Bio" component={BioScreen} /> 
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
    </>
  ); 
}

export default App; 

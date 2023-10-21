import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';


const Stack = createNativeStackNavigator();

function Stack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Welcome" component={WelcomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUpScreen} /> 
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default function App() {
  return (
    <NavigationContainer>
        <Tab.Navigator
            screenOptions={() => ({
                headerShown: false,
                tabBarIcon: () => {
                    let Icon; 
                    if(route.name == 'Home') {
                        Icon = <Foundation name='home' size={25} />;
                    } else if (route.name == 'Search') {
                        Icon = <AntDesign name='search1' size={25} />;
                    } else if (route.name == 'Notification') {
                        Icon = <Ionicons name='notifications-outline' size={25} />;
                    } else {
                        Icon = <Entypo name='map' size={25} />; 
                    }
                    return Icon; 
            },
            })}>
            <Tab.Screen name='Home' component={HomeScreen} />
            <Tab.Screen name='Search' component={HomeScreen} />
            <Tab.Screen name='Notification' component={HomeScreen} />
            <Tab.Screen name='Map' component={HomeScreen} />
        </Tab.Navigator>
    </NavigationContainer>
); 
}


export default function App() {

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
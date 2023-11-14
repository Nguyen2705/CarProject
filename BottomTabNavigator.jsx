import React, {useState} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';

// Import your screen components
import HomeScreen from './screens/HomeScreen'
import SearchScreen from './screens/SearchScreen'
import NotificationScreen from './screens/NotificationScreen';
import MapScreen from './screens/MapScreen';
import CreatePostScreen from './screens/CreatePostScreen'

const Tab = createBottomTabNavigator();

const bottomTabIcons = {
    New: {
      active: <Ionicons name="md-home" size={25} color="#333363" />,
      inactive: <Ionicons name="md-home-outline" size={25} color="#333363" />,
    },
    Search: {
      active: <Ionicons name="ios-search" size={25} color="#333363" />,
      inactive: <Ionicons name="search-outline" size={25} color="#333363" />,
    },
    Post: {
      active: (
        <Ionicons
          name="add-circle"
          size={80}
          color="#faca63"
          style={{ flex: 1, marginVertical: -20 }}
        />
      ),
      inactive: (
        <Ionicons
          name="add-circle"
          size={80}
          color="#faca63"
          style={{ flex: 1, marginVertical: -20 }}
        />
      ),
    },
    Notification: {
      active: <Ionicons name="ios-notifications" size={25} color="#333363" />,
      inactive: <Ionicons name="notifications-outline" size={25} color="#333363" />,
    },
    Map: {
      active: <Ionicons name="ios-map" size={25} color="#333363" />,
      inactive: <Ionicons name="ios-map-outline" size={25} color="#333363" />,
    },
  };
  

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
          initialRouteName='New'   //Initial Route to "New" after login successfully
          tabBarOptions={{
            style: styles.container, 
          }}
        >
          <Tab.Screen
            name="New"
            component={HomeScreen}
            options={{
              tabBarLabel: 'New',
              tabBarShowLabel: false, 
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                focused ? bottomTabIcons.New.active : bottomTabIcons.New.inactive
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
              tabBarIcon: ({ focused }) => (
                focused ? bottomTabIcons.Search.active : bottomTabIcons.Search.inactive
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
              tabBarIcon: ({ focused }) => (
                focused ? bottomTabIcons.Post.active : bottomTabIcons.Post.inactive
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
              tabBarIcon: ({ focused }) => (
                focused ? bottomTabIcons.Notification.active : bottomTabIcons.Notification.inactive
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
              tabBarIcon: ({ focused }) => (
                focused ? bottomTabIcons.Map.active : bottomTabIcons.Map.inactive
              ),
            }}
          />
        </Tab.Navigator>
    );  

};

export default BottomTabNavigator;

const styles = StyleSheet.create ({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
    }, 
})

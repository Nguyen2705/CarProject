// import React from 'react'; 
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
// import HomeScreen from '../screens/HomeScreen';
// import Foundation from 'react-native-vector-icons/Foundation'; 
// import AntDesign from 'react-native-vector-icons/AntDesign'; 
// import Entypo from 'react-native-vector-icons/Entypo';
// import Ionicons from '@expo/vector-icons/Ionicons'; 

// const Tab = createBottomTabNavigator(); 

// const BottomTab = () => {
//     return (
//         <NavigationContainer>
//             <Tab.Navigator
//                 screenOptions={() => ({
//                     headerShown: false,
//                     tabBarIcon: () => {
//                         let Icon; 
//                         if(route.name == 'Home') {
//                             Icon = <Foundation name='home' size={25} />;
//                         } else if (route.name == 'Search') {
//                             Icon = <AntDesign name='search1' size={25} />;
//                         } else if (route.name == 'Notification') {
//                             Icon = <Ionicons name='notifications-outline' size={25} />;
//                         } else {
//                             Icon = <Entypo name='map' size={25} />; 
//                         }
//                         return Icon; 
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
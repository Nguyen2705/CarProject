// import React from 'react'; 
// import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
// import { useNavigation } from '@react-navigation/core';
// import { auth } from '../firebase';
// import Ionicons from '@expo/vector-icons/Ionicons';


// const Header = () => {
//     const navigation = useNavigation();
//     const [menuVisible, setMenuVisible] = useState(false);
  
    // const handleSignOut = () => {
    //   auth
    //     .signOut()
    //     .then(() => {
    //       navigation.replace('Login');
    //     })
    //     .catch((error) => alert(error.message));
    // };
  

//     return (
//         <View style={styles.container}>
//           {/* New Message Button */}
//           <View style={styles.headerRight}>
//             <TouchableOpacity onPress={toggleMenu} style={styles.userProfileButton}>
//               <Ionicons name="person-circle-outline" size={35} color="#333363" />
//             </TouchableOpacity>
//             {menuVisible && (
//               <View style={styles.profileMenu}>
//                 <TouchableOpacity onPress={() => navigation.replace('Login')}>
//                   <Text style={styles.profileMenuItem}>Profile</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={handleSignOut}>
//                   <Text style={styles.profileMenuItem}>Sign Out</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>
//         </View>
//     );
// };

// export default Header; 

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: 'white',
//     },
//     header: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       padding: 10,
//       borderBottomWidth: 1,
//       borderBottomColor: '#E5E5E5',
//       justifyContent: 'space-between',
//     },
//     logo: {
//       width: 45,
//       height: 45,
//       marginTop: 45,
//       marginLeft: 45,
//     },
//     userProfileButton: {
//       alignItems: 'center',
//       padding: 5,
//       borderRadius: 10,
//       marginTop: 45,
//     },
    // profileMenu: {
    //   position: 'absolute',
    //   top: 30,
    //   right: 45,
    //   backgroundColor: '#faca63',
    //   borderRadius: 10,
    //   padding: 1,
    // },
    // profileMenuItem: {
    //   fontSize: 18,
    //   color: '#333363',
    //   paddingVertical: 6,
    //   paddingHorizontal: 16,
    //   borderBottomWidth: 1,
    //   borderBottomColor: '#333363',
    // },
    
//     headerRight: {
//       flexDirection: 'row',
//       alignItems: 'center',
//     },
//     content: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       padding: 20,
//     },
//     emailText: {
//       fontSize: 16,
//       marginBottom: 20,
//     },
//     signOutButtonText: {
//       color: '#333363',
//       fontWeight: 'bold',
//       fontSize: 16,
//       alignSelf: 'flex-end',
//     },
//     footer: {
//       flexDirection: 'row',
//       justifyContent: 'space-around',
//       alignItems: 'center',
//       borderTopWidth: 1,
//       borderTopColor: '#E5E5E5',
//       paddingVertical: 10,
//     },
//     footerButton: {
//       alignItems: 'center',
//       justifyContent: 'space-around',
//       flex: 1,
//     },
//     footerButtonText: {
//       color: '#333363',
//       fontSize: 12,
//       fontWeight: 'bold',
//     },
//     newPostButton: {
//       alignItems: 'center',
//       marginTop: -10,
//       bottom: 23,
//     },
// });
  
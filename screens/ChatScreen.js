// import React, { useState, useEffect, useCallback } from 'react';
// import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';
// import { auth } from '../firebase'; // Import the 'auth' object from your firebase.js file
// import { GiftedChat, Send } from 'react-native-gifted-chat';
// import Ionicons from '@expo/vector-icons/Ionicons';

// const ChatScreen = () => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const db = firebase.firestore();
//   const navigation = useNavigation();

//   useEffect(() => {
//     // Load chat messages from Firebase Firestore
//     const unsubscribe = db.collection('messages').orderBy('timestamp').onSnapshot((snapshot) => {
//       const messageList = snapshot.docs.map((doc) => ({
//         _id: doc.id,
//         text: doc.data().text,
//         createdAt: doc.data().timestamp.toDate(),
//         user: {
//           _id: doc.data().userId, // Replace with your user ID logic
//           name: doc.data().userName, // Replace with your user name logic
//         },
//       }));
//       setMessages(messageList);
//       setLoading(false); // Set loading to false when messages are loaded
//     });

//     return () => {
//       unsubscribe(); // Unsubscribe from Firestore updates when the component unmounts
//     };
//   }, []);

//   const onSend = useCallback((messages = []) => {
//     setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
//     const { _id, text, createdAt } = messages[0];

//     // Add the new message to Firebase
//     db.collection('messages').add({
//       text: text,
//       timestamp: createdAt,
//       userId: auth.currentUser.uid, // Replace with your user ID logic
//       userName: auth.currentUser.displayName, // Replace with your user name logic
//     });
//   }, []);

//   const handleGoBack = () => {
//     navigation.navigate('Home');
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
//           <Ionicons name="arrow-back" size={30} color="#333363" />
//         </TouchableOpacity>
//         <Text style={styles.headerText}>Chat Room</Text>
//       </View>
//       {loading ? (
//         <ActivityIndicator style={styles.loader} size="large" color="#333363" />
//       ) : (
//         <GiftedChat
//           messages={messages}
//           onSend={messages => onSend(messages)}
//           user={{
//             _id: auth.currentUser.uid, // Replace with your user ID logic
//           }}
//           renderSend={(props) => (
//             <Send {...props}>
//               <View style={styles.sendButtonContainer}>
//                 <Text style={styles.sendButtonText}>Send</Text>
//               </View>
//             </Send>
//           )}
//         />
//       )}
//     </View>
//   );
// };

// export default ChatScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F7F7F7',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E5E5',
//     justifyContent: 'center',
//     backgroundColor: '#333363', // Header background color
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white', // Header text color
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   sendButtonContainer: {
//     marginRight: 10,
//     marginBottom: 10,
//   },
//   sendButtonText: {
//     color: '#333363',
//     fontWeight: 'bold',
//   },
//   goBackButton: {
//     position: 'absolute',
//     top: 20,
//     left: 10,
//     padding: 10,
//     borderRadius: 20,
//     backgroundColor: 'white', // Go back button background color
//   },
// });

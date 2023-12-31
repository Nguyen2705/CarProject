import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { auth } from '../firebase'; // Import the 'auth' object from your firebase.js file
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat';
import Ionicons from '@expo/vector-icons/Ionicons';


const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = firebase.firestore();
  const navigation = useNavigation();

  useEffect(() => {
    // Load chat messages from Firebase Firestore
    const unsubscribe = db.collection('messages').orderBy('timestamp').onSnapshot((snapshot) => {
      const messageList = snapshot.docs.map((doc) => ({
        _id: doc.id,
        text: doc.data().text,
        createdAt: doc.data().timestamp.toDate(),
        user: {
          _id: doc.data().userId, // Replace with your user ID logic
          name: doc.data().userName, // Replace with your user name logic
        },
      }));
      setMessages(messageList.reverse());
      setLoading(false); // Set loading to false when messages are loaded
    });

    return () => {
      unsubscribe(); // Unsubscribe from Firestore updates when the component unmounts
    };
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
    const { _id, text, createdAt } = messages[0];

    // Add the new message to Firebase
    db.collection('messages').add({
      text: text,
      timestamp: createdAt,
      userId: auth.currentUser.uid, // Replace with your user ID logic
      userName: auth.currentUser.displayName, // Replace with your user name logic
      userImage: auth.currentUser.photoURL, // Replace with your user image logic
    });
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
          <Ionicons name="chevron-back-outline" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Chat Room</Text>
      </View>
      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" color="#333363" />
      ) : (
        <GiftedChat
          messages={messages}
          showAvatarForEveryMessage={true}
          onSend={messages => onSend(messages)}
          user={{
            _id: auth.currentUser.uid, // Replace with your user ID logic
            avatar: auth.currentUser.photoURL, // Replace with your user image logic
          }}
          renderSend={(props) => (
            <Send {...props}>
              <View style={styles.sendButtonContainer}>
                <Text style={styles.sendButtonText}>Send</Text>
              </View>
            </Send>
          )}
          containerStyle={styles.chatContainer} // Add this line for the overall container
       
          renderBubble={props => (
         <Bubble
         {...props}
             wrapperStyle={{
            right: {
             backgroundColor: '#0078FF', // Right bubble background color
          },
        left: {
           // Add code to change left bubble background color 
        },
      }}
    />
  )}
        />
      )}
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Platform.OS == 'ios' ? 40 : 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    justifyContent: 'center',
    backgroundColor: '#333363', // Header background color
  },
  headerText: {
    top: Platform.OS == 'ios' ? 20 : 5,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white', // Header text color
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatContainer: {
    backgroundColor: '#FFFFFF', // Background color of the chat box
    borderTopWidth: 1, // Example border at the top of the chat box
    borderColor: '#E5E5E5', // Border color
    paddingBottom: 5,
  },
  sendButtonContainer: {
    marginRight: 15,
    marginBottom: Platform.OS == 'ios' ? 24.5 : 23,
  },
  sendButtonText: {
    top: '80%',
    color: '#333363',
    fontWeight: 'bold',
  },
  goBackButton: {
    position: 'absolute',
    top: Platform.OS == 'ios' ? 60 : 30 ,
    left: 15,
  },
});
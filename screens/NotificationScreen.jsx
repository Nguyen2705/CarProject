import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, SectionList, Platform, RefreshControl } from 'react-native';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import firebase from 'firebase/compat/app';
import { auth } from '../firebase';

const NotificationScreen = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [username, setUsername] = useState('');
  const db = firebase.firestore();
  const storage = getStorage();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      if (user) {
        fetchUserData(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const onRefresh = useCallback(async () => {
    if (currentUser) {
      setRefreshing(true);
      try {
        await fetchUserData(currentUser.uid);
        await fetchImageURL(currentUser.uid);
      } catch (error) {
        console.error('Error on refreshing:', error);
      }
      setRefreshing(false);
    }
  }, [currentUser]);

  const fetchUserData = async (uid) => {
    const userRef = db.collection('users').doc(uid);
    try {
      const doc = await userRef.get();
      if (doc.exists) {
        setUsername(doc.data().username);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchImageURL = async (uid) => {
    try {
      const storageRef = ref(storage, `profileImage/${uid}`);
      const url = await getDownloadURL(storageRef);
      setImageURL(url);
    } catch (error) {
      console.error('Error fetching image URL:', error);
    }
  };

  // Replace this with your actual notifications data
  const notifications = [
    { id: '1', action: 'Liked your Post', timestamp: new Date().getTime() },
    { id: '2', action: 'Started following you', timestamp: new Date().getTime() - (2 * 24 * 60 * 60 * 1000) }, 
    { id: '3', action: 'Shared your Post', timestamp: new Date().getTime() - (8 * 24 * 60 * 60 * 1000) }, 
    { id: '4', action: 'Liked your Post', timestamp: new Date().getTime() - (14 * 24 * 60 * 60 * 1000) },
    { id: '5', action: 'Started Following you', timestamp: new Date().getTime() - (21 * 24 * 60 * 60 * 1000) },
    // ... more notifications
  ];

  // Categorize notifications by time
  const categorizedNotifications = {
    today: [],
    thisWeek: [],
    thisMonth: [],
    older: []
  };

  notifications.forEach(item => {
    const now = new Date();
    const notificationDate = new Date(item.timestamp);
    const oneDay = 24 * 60 * 60 * 1000;
    const daysAgo = Math.floor((now - notificationDate) / oneDay);

    if (daysAgo < 1) categorizedNotifications.today.push(item);
    else if (daysAgo < 7) categorizedNotifications.thisWeek.push(item);
    else if (daysAgo < 30) categorizedNotifications.thisMonth.push(item);
    else categorizedNotifications.older.push(item);
  });

  const sections = [
    { title: 'Today', data: categorizedNotifications.today },
    { title: 'This week', data: categorizedNotifications.thisWeek },
    { title: 'This month', data: categorizedNotifications.thisMonth },
    { title: 'Older', data: categorizedNotifications.older },
  ].filter(section => section.data.length > 0);

  // Function to render each notification item
  const renderNotificationItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Image source={{ uri: imageURL || 'default_avatar_url' }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.userName}>{username}</Text>
        <Text style={styles.actionText}>{item.action}</Text>
      </View>
    </View>
  );

  // Render Section Header
  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerBackground}>
        <Text 
          style={{
            top: Platform.OS == 'ios' ? 27.5 : 5,
            fontSize: 20,
            fontWeight: 'bold',
            color: '#333363', // Header text color
          }}
        >
          Notifications
        </Text>
      </View>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderNotificationItem}
        renderSectionHeader={renderSectionHeader}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontWeight: 'bold',
  },
  actionText: {
    color: '#555',
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: '#f7f7f7',
    padding: 10,
  },
  headerBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: Platform.OS == 'ios' ? 5 : 10,
    paddingVertical: Platform.OS == 'ios' ? 40 : 10,
    
    justifyContent: 'center',
    backgroundColor: 'white', // Header background color
  },
});

export default NotificationScreen;

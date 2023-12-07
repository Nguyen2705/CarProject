import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  SafeAreaView, 
  ScrollView, 
  RefreshControl } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Post from '../navigation/Post';
import Header from '../navigation/Header';
import { auth, firestore, storage } from '../firebase';
import firebase from 'firebase/compat/app';
import { ref, getDownloadURL } from "firebase/storage";
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [caption, setCaption] = useState('');
  const [comments, setComments] = useState([]);
  const [likes, setLike] = useState(0);
  const [timestamp, setTimeStamp] = useState('');
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const db = firebase.firestore();

  const [refreshing, setRefreshing] = useState(false);

  const fetchUserData = async (uid) => {
    const userRef = db.collection('users').doc(uid);
    try {
      const doc = await userRef.get();
      if (doc.exists) {
        setUsername(doc.data().username);
        setFollowers(doc.data().followers); 
        setFollowing(doc.data().following); 
        setComments(doc.data().comments)
        setFollowersList(doc.data().followersList); 
        setFollowingList(doc.data().followingList); 
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const loadUserProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(firestore, 'users', user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setUsername(docSnap.data().username);
        } else {
          // Document does not exist
          Alert.alert('Error', 'User data not found.');
        }
      }
    };

    loadUserProfile();
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchUserData(currentUser.uid);
    }
  }, [currentUser]);

  const fetchImageURL = async (uid) => {
    const storageRef = ref(storage, `profileImage/${uid}`);
    const url = await getDownloadURL(storageRef);
    setImageURL(url);
  };

  const unsubscribe = auth.onAuthStateChanged((user) => {
    setCurrentUser(user);
    if (user) {
      fetchUserData(user.uid);
      fetchImageURL(user.uid);
    }
  });

  const fetchPostsData = async () => {
    const postsCollection = collection(db, 'posts');
    const postsSnapshot = await getDocs(postsCollection);
    const postsData = postsSnapshot.docs
      .map((doc) => doc.data())
      .sort((a, b) => b.timestamp.seconds - a.timestamp.seconds); // Sort by timestamp in descending order
    setPosts(postsData);
  };

  useEffect(() => {
    fetchPostsData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    // Fetch updated data or do any other async operation
    fetchPostsData()
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  };

  // const handleFollowing = async (targetUserId, isFollowing) => {
  //   const currentUserRef = doc(db, 'users', currentUser.uid);
  //   const targetUserRef = doc(db, 'users', targetUserId);

  //   try {
  //       if (isFollowing) {
  //       // Unfollow logic
  //       await updateDoc(currentUserRef, {
  //           followingList: arrayRemove(targetUserId),
  //           following: firebase.firestore.FieldValue.decrement(1),
  //       });
  //       await updateDoc(targetUserRef, {
  //           followersList: arrayRemove(currentUser.uid),
  //           followers: firebase.firestore.FieldValue.decrement(1),
  //       });
  //       } else {
  //       // Follow logic
  //       await updateDoc(currentUserRef, {
  //           followingList: arrayUnion(targetUserId),
  //           following: firebase.firestore.FieldValue.increment(1),
  //       });
  //       await updateDoc(targetUserRef, {
  //           followersList: arrayUnion(currentUser.uid),
  //           followers: firebase.firestore.FieldValue.increment(1) 
  //       });
  //       }
  //       console.log(`User ${currentUser.uid} is ${isFollowing ? 'unfollowing' : 'following'} user ${targetUserId}`);
  //   } catch (error) {
  //       console.error('Error updating follow status:', error);
  //   }
  // }

  return (
    <View style={styles.container}>
      <View style={styles.headerBackground}>
        <Header />
      </View>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <ScrollView
            refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
          >
            {posts && posts.map((post, index) => (
              <Post post={post} key={index}  />
              // handleFollowing={() => handleFollowing(post.uid, followingList.includes(post.uid))}
            ))}
          </ScrollView>
        </SafeAreaView>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerBackground: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default HomeScreen;

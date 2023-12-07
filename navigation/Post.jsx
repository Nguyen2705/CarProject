import React, { useState, useEffect } from 'react'; 
import { View, Text, StyleSheet, Image } from 'react-native'; 
import { Divider } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome, MaterialCommunityIcons, AntDesign, Octicons } from '@expo/vector-icons'; 
import { doc, updateDoc, getDoc, collection } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import firebase from 'firebase/compat/app';

const Post = ({ post }) => {
    const [isTouched, setIsTouched] = useState(true); 


    const change = () => {
        setIsTouched(!isTouched); 
    };
    
    const defaultIcon = (
        <FontAwesome name='star-o' size={30} style={styles.iconFooter} />
    ); 
    
    const changeIcon = (
        <FontAwesome name='star' size={30} style={styles.iconFooter} />
    );     

    return ( 
        <View style={{ marginBottom: 30 }}>
            <Divider width={1} orientation='vertical' />
            <PostHeader post={post} />
            <PostImage post={post} />
            <View style={{ marginHorizontal: 15, marginTop: 10}}>
                <PostFooter />
                <Likes post={post} />
                <Caption post={post} />
                <CommentSection post={post} />
                <Comment comments={post.comments} />
            </View>
        </View>
    ); 
};

const PostHeader = ({ post }) => {
    // const [username, setUsername] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [postUser, setPostUser] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    // const [posts, setPosts] = useState(null);
    // const [comments, setComments] = useState([]);
    // const [likes, setLike] = useState(0);
    // const [followers, setFollowers] = useState(0);
    // const [following, setFollowing] = useState(0);

    const db = firebase.firestore();

    const postRef = post.uid;
    //console.log(postRef);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    // const fetchUserData = async (uid) => {
    // const userRef = db.collection('users').doc(uid);
    // try {
    //     const doc = await userRef.get();
    //     if (doc.exists) {
    //         setUsername(doc.data().username);
    //         setFollowers(doc.data().followers); 
    //         setFollowing(doc.data().following); 
    //         setComments(doc.data().comments)
    //     }
    // } catch (error) {
    //     console.error('Error fetching user data:', error);
    // }
    // };

    // useEffect(() => {
    // const loadUserProfile = async () => {
    //     const user = auth.currentUser;
    //     if (user) {
    //         const userRef = doc(firestore, 'users', user.uid);
    //         const docSnap = await getDoc(userRef);

    //         if (docSnap.exists()) {
    //             setUsername(docSnap.data().username);
    //             setFollowers(docSnap.data().followers); 
    //             setFollowing(docSnap.data().following); 
    //             setComments(docSnap.data().comments)
    //         } else {
    //             // Document does not exist
    //             Alert.alert('Error', 'User data not found.');
    //         }
    //     }
    // };

    // loadUserProfile();
    // }, []);
    
    // useEffect(() => {
    // if (currentUser) {
    //     fetchUserData(currentUser.uid);
    // }
    // }, [currentUser]);

    // const fetchPostsData = async () => {
    //     const postsCollection = collection(db, 'posts');
    //     const postsSnapshot = await getDoc(postsCollection);
    //     const postsData = postsSnapshot.docs.map((doc) => doc.data());
    //     setPosts(postsData);
    //   };
    
    // useEffect(() => {
    //     fetchPostsData();
    // }, []);

    // const handleFollow = async () => {
    //     try {
    //       const user = auth.currentUser;
      
    //       // Check if the user is logged in
    //       if (!user) {
    //         console.error('User is not logged in.');
    //         return;
    //       }
      
    //       const currentUserDoc = doc(firestore, 'users', user.uid);
    //       const postAuthorDoc = doc(firestore, 'posts', post.uid);
      
    //       // Check if the user is already following
    //       if (isFollowing) {
    //         // Unfollow logic - decrement follower count for the current user and following count for the post author
    //         await updateDoc(currentUserDoc, { followers: followers - 1 });
    //         await updateDoc(postAuthorDoc, { following: following - 1 });
    //       } else {
    //         // Follow logic - increment follower count for the current user and following count for the post author
    //         await updateDoc(currentUserDoc, { followers: followers + 1 });
    //         await updateDoc(postAuthorDoc, { following: following + 1 });
    //       }
      
    //       // Toggle the follow status
    //       setIsFollowing(!isFollowing);
    //     } catch (error) {
    //       console.error('Error updating follow status:', error);
    //     }
    //   };
    const onFollow = async () => {
        try {
          const userDoc = await db.collection("users").doc(postRef).get();
      
          if (userDoc.exists) {
            // Get the current followersList array
            const currentFollowersList = userDoc.data().followersList || [];
      
            // Check if the user is already in the followersList
            if (!currentFollowersList.includes(currentUser.uid)) {
              // Add the current user to the followersList
              await db.collection("users")
                .doc(postRef)
                .update({
                    followersList: firebase.firestore.FieldValue.arrayUnion(currentUser.uid),
                    following: firebase.firestore.FieldValue.increment(1)
                });
      
              console.log('Successfully followed user!');
            } else {
              console.log('User is already in the followersList.');
            }
          } else {
            console.log('User document does not exist.');
          }
        } catch (error) {
          console.error('Error following user:', error);
        }
        setIsFollowing(true);
      };
      const onUnfollow = async () => {
        try {
          // Remove the current user from the followersList
          await db.collection("users")
            .doc(postRef)
            .update({
              followersList: firebase.firestore.FieldValue.arrayRemove(currentUser.uid),
              following: firebase.firestore.FieldValue.increment(-1)
            });
      
          console.log('Successfully unfollowed user!');
        } catch (error) {
          console.error('Error unfollowing user:', error);
        }
        setIsFollowing(false);

      };
      

    return (
        <View 
            style={{
                flexDirection: 'row', 
                justifyContent: 'space-between',
                margin: 5, 
                alignItems: 'center', 
            }}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <Image source={{ uri: post.userImage }} style={styles.icon}/> 
                <Text style={{ color: '#333363', marginLeft: 5, fontWeight: '700'}}>
                    {post.username} 
                </Text>
            </View>
            {isFollowing ? (
                <TouchableOpacity style={styles.followingButton} onPress={() => onUnfollow()}>
                    <Text style={styles.followingButtonText}>
                        Following
                    </Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.followingButton} onPress={() => onFollow()}>
                    <Text style={styles.followingButtonText}>
                        Follow
                    </Text>
                </TouchableOpacity>
            )}
            
        </View>
    ); 
}; 

const PostImage = ({ post }) => {
    return (
        <View 
            style={{
                width: '100%', 
                height: 300
            }}
        >
            <Image 
                source={{uri: post.image}}
                style={{ flex: 1, resizeMode: 'cover' }}
            />
        </View>
    ); 
};

const PostFooter = () => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={styles.leftFooterIconsContainer}>
                {/* Like Button */}
                <TouchableOpacity onPress={() => {}}>
                    <FontAwesome name='star-o' size={30} style={styles.iconFooter}/>
                </TouchableOpacity>
                {/* Comment Button  */}
                <TouchableOpacity onPress={() => {}}>
                    <MaterialCommunityIcons name='comment-outline' size={30} style={styles.iconFooter} />
                </TouchableOpacity>
                {/* Send Post */}
                <TouchableOpacity onPress={() => {}}>
                    <AntDesign name='enter' size={30} style={{width: 30, height: 30, color: '#333363', transform: [{rotateY: '180deg'}]}} />
                </TouchableOpacity>
            </View>
            
            <View style={{ flexDirection: 'row', alignItems: 'flex-end'}}>
                {/* Save Post */}
                <TouchableOpacity onPress={() => {}}>
                    <Octicons name='archive' size={30} style={styles.iconFooter} />
                </TouchableOpacity>
            </View>
        </View>
    ); 
}; 

const Likes = ({ post }) => (
    <View style={{ flexDirection: 'row', marginTop: 4 }}>
        <Text style={{ color: 'white', fontWeight: '600'}}>
            {post.likes} likes
        </Text>
    </View>
)

const Caption = ({ post }) => (
    <View style={{ marginTop: 5 }}>
        <Text style={{ color: '#333363' }}>
            <Text style={{fontWeight: '600'}}>{post.username} </Text>
            <Text>{post.caption}</Text>
        </Text>
    </View>
)

const CommentSection = ({ post }) => (
    <View style={{ marginTop: 5 }}>
      {!!post.comments && post.comments.length > 0 && (
        <Text style={{ color: 'gray' }}>
          {`View ${post.comments.length} ${post.comments.length > 1 ? 'comments' : 'comment'}`}
        </Text>
      )}
    </View>
);
  

const Comment = ({ comments }) => (
    <>
      {comments && comments.map((comment, index) => (
        <View key={index} style={{ flexDirection: 'row', marginTop: 10 }}>
          <Text style={{ color: '#333363' }}>
            <Text style={{ fontWeight: '600' }}>{comment.username}</Text>{' '}
            {comment.comment}
          </Text>
        </View>
      ))}
    </>
);
  
const styles = StyleSheet.create({
    icon: {
        width: 35, 
        height: 35, 
        borderRadius: 50, 
        marginLeft: 6, 
        borderWidth: 1.6, 
        borderColor: '#ff8501', 
    }, 
    iconStyle: {
        width: 40, 
        height: 40, 
    }, 
    iconFooter: {
        width: 30, 
        height: 30, 
        color: '#333363'
    }, 
    leftFooterIconsContainer: {
        flexDirection: 'row', 
        width: '35%', 
        justifyContent: 'space-between', 
    }, 
    followingButton: {
        backgroundColor: '#faca63',
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
    },
    followingButtonText: {
        color: '#333363',
        fontWeight: 'bold',
    },
})

export default Post;

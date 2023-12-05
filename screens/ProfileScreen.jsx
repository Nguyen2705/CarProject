import React, { useState, useEffect, useCallback } from 'react';
import { 
    View, 
    Text, 
    Image, 
    StyleSheet, 
    TouchableOpacity, 
    Modal, 
    TouchableWithoutFeedback, 
    RefreshControl,
    ScrollView, 
    FlatList,
 } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../firebase';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import firebase from 'firebase/compat/app';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const [currentUser, setCurrentUser] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [imageURL, setImageURL] = useState(null);
    const [postsnum, setPostNum] = useState(0);
    const [postId, setPostID] = useState(null);
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    const [bio, setBio] = useState('');
    const [username, setUsername] = useState('');
    const [image, setImage] = useState(null);

    const db = firebase.firestore();
    const storage = getStorage();

    const [refreshing, setRefreshing] = useState(false);

    const fetchUserData = async (uid) => {
        const userRef = db.collection('users').doc(uid);
        try {
            const doc = await userRef.get();
            if (doc.exists) {
                setUsername(doc.data().username);
                setFirstName(doc.data().firstName);
                setLastName(doc.data().lastName);
                setBio(doc.data().bio);
                setPostNum(doc.data().posts); 
                setFollowers(doc.data().followers); 
                setFollowing(doc.data().following)
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            if (user) {
                fetchUserData(user.uid);
                const storageRef = ref(storage, 'profileImage/' + user.uid);
                getDownloadURL(storageRef)
                    .then(url => setImageURL(url))
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchUserPosts = async (uid) => {
        const postRef = db.collection('posts').doc(uid);
        try {
            const doc = await postRef.get();
            if (doc.exists) {
                setImage(doc.data().image); 
                setPostID(doc.data().postId); 
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        const unsubscribeFocus = navigation.addListener('focus', () => {
            if (currentUser) {
                fetchUserData(currentUser.uid);
                fetchUserPosts(currentUser.uid); 
            }
        });

        return unsubscribeFocus;
    }, [currentUser]);

    const handleGoBack = () => {
        navigation.goBack();
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleSignOut = () => {
        auth
          .signOut()
          .then(() => {
            navigation.replace('Login');
          })
          .catch((error) => alert(error.message));
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchUserData(currentUser.uid);
      
        setRefreshing(false);
    }, [currentUser]);

    return (
      <TouchableWithoutFeedback onPress={() => {
        setModalVisible(false);
        setMenuVisible(false);
    }}>
        {/* <ScrollView 
            style={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }> */}
        <View style={styles.container} >
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
                    <Ionicons name="chevron-back-outline" size={30} color="#333363" />
                </TouchableOpacity>

                <TouchableOpacity onPress={toggleMenu}>
                    <Ionicons name='settings-outline' size={26} style={styles.settingsButton} />
                </TouchableOpacity>

                {menuVisible && (
                    <View style={styles.settingsMenu}>
                        <Text style={styles.settingsMenuItem}>{username}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Bio')}>
                            <Text style={styles.settingsMenuItem}>Edit Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSignOut}>
                            <Text style={styles.signOutMenuItem}>Sign Out</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {currentUser && (
                    <>
                        <TouchableOpacity onPress={toggleModal}>
                            <Image
                                style={styles.avatar}
                                source={{ uri: imageURL || 'https://firebasestorage.googleapis.com/v0/b/car-project-b12f9.appspot.com/o/profileImage%2Fdefault.png?alt=media&token=e2443c3b-fc13-4eff-8533-e7c6504dc737' }}
                            />
                        </TouchableOpacity>
                        <Text style={styles.name}>{`${username}`}</Text>
                        <Text style={styles.bio}>Bio: {bio}</Text>
                    </>
                )}
            </View>

            <View style={styles.stats}>
                <View style={styles.stat}>
                    <Text style={styles.statNumber}>{`${postsnum}`}</Text>
                    <Text style={styles.statTitle}>Posts</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statNumber}>{`${followers}`}</Text>
                    <Text style={styles.statTitle}>Followers</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statNumber}>{`${following}`}</Text>
                    <Text style={styles.statTitle}>Following</Text>
                </View>
            </View>

            <View style={styles.photos}>
                <FlatList
                    data={[{ image, postId }]}
                    keyExtractor={(item) => item.post}
                    numColumns={3}
                    renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                        // Handle tapping on a specific post/image
                        }}
                    >
                        <Image
                        style={styles.photo}
                        source={{ uri: image }}
                        />
                    </TouchableOpacity>
                    )}
                />
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={isModalVisible}
            >
              <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.modalOption} onPress={() => { toggleModal(); navigation.navigate('Library'); }}>
                        <Text style={styles.modalOptionText}>Choose From Library</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalOption} onPress={() => { toggleModal(); navigation.navigate('Camera'); }}>
                        <Text style={styles.modalOptionText}>Take Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalOption} onPress={() => {toggleModal(); navigation.navigate('View');}}>
                        <Text style={styles.modalOptionText}>View Profile Picture</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalCloseButton} onPress={toggleModal}>
                        <Text style={styles.modalCloseButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
                </TouchableWithoutFeedback>
            </Modal>
        {/* </ScrollView> */}
        </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        alignItems: 'center',
        marginTop: Platform.OS === 'ios' ? 53 : 5,
    },
    avatar: {
        marginTop: 10,
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    bio: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 30,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
    },
    stat: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    statTitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    photos: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingHorizontal: 10,
    },
    photo: {
        aspectRatio: 1,
        marginBottom: 10,
    },
    goBackButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 2,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      },
      modalOption: {
        backgroundColor: 'white',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      modalOptionText: {
        fontSize: 18,
        textAlign: 'center',
        color: 'rgb(10, 132, 255)',
      },
      modalCloseButton: {
        backgroundColor: 'white',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        padding: 20,
        marginTop: 10,
        marginBottom: 20,
      },
      modalCloseButtonText: {
        fontSize: 18,
        textAlign: 'center',
        color: 'red',
      },
      settingsButton: {
        position: 'absolute',
        color: '#333363',
        top: 10, // Adjust the top value to position it as needed
        left: '40%', // Adjust the right value to position it as needed
    },
    settingsMenu: {
        position: 'absolute',
        top: 35,
        right: 35,
        backgroundColor: '#faca63',
        borderRadius: 10,
        padding: 10,
        borderWidth: 0.5, // Add borderWidth for the border
        borderColor: '#333363', // Set the border color
    },
    signOutMenuItem: {
        fontSize: 15,
        color: '#333363',
        paddingVertical: 5,
      },
    settingsMenuItem: {
        fontSize: 15,
        color: '#333363',
        paddingVertical: 5,
        paddingHorizontal: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#333363',
    },
});

export default ProfileScreen;
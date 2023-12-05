import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../firebase';
import CameraAccess from '../backend/camera';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import firebase from 'firebase/compat/app';
import getImageURL from '../backend/fetchImage';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const [currentUser, setCurrentUser] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [imageURL, setImageURL] = useState(null);
    const [bio, setBio] = useState('');
    const [username, setUsername] = useState('');
    const db = firebase.firestore();
    const storage = getStorage();

    const fetchUserData = async (uid) => {
        const userRef = db.collection('users').doc(uid);
        try {
            const doc = await userRef.get();
            if (doc.exists) {
                setUsername(doc.data().username);
                setFirstName(doc.data().firstName);
                setLastName(doc.data().lastName);
                setBio(doc.data().bio);
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
                    .catch(error => console.error('Error fetching image URL:', error));
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribeFocus = navigation.addListener('focus', () => {
            if (currentUser) {
                fetchUserData(currentUser.uid);
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

    return (
      <TouchableWithoutFeedback onPress={() => {
        setModalVisible(false);
        setMenuVisible(false);
    }}>
        <View style={styles.container}>
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
                                source={{ uri: imageURL }}
                            />
                        </TouchableOpacity>
                        <Text style={styles.name}>{`${firstName} ${lastName}`}</Text>
                        <Text style={styles.bio}>Bio: {bio}</Text>
                    </>
                )}
            </View>

            <View style={styles.stats}>
                <View style={styles.stat}>
                    <Text style={styles.statNumber}>3</Text>
                    <Text style={styles.statTitle}>Posts</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statNumber}>1.5K</Text>
                    <Text style={styles.statTitle}>Followers</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statNumber}>200</Text>
                    <Text style={styles.statTitle}>Following</Text>
                </View>
            </View>

            <View style={styles.photos}>
                <Image
                    style={{ ...styles.photo, width: '32%', height: '70%' }}
                    source={{ uri: 'https://hips.hearstapps.com/hmg-prod/images/07-chiron-dynamic-34-front-web-1499959186.jpg?crop=0.8888888888888888xw:1xh;center,top&resize=2048:*' }}
                />
                <Image
                    style={{ ...styles.photo, width: '32%', height: '70%' }}
                    source={{ uri: 'https://assets.whichcar.com.au/image/upload/s--Ug5_-ZFW--/ar_2.304921968787515,c_fill,f_auto,q_auto:good/c_scale,w_2048/v1/archive/whichcar/2019/02/14/-1/2019-Mercedes-AMG-G63-performance-review.jpg' }}
                />
                <Image
                    style={{ ...styles.photo, width: '32%', height: '70%' }}
                    source={{ uri: 'https://www.topgear.com/sites/default/files/2021/09/309038_Honda_Civic_Type_R_Sportline.jpg?w=892&h=502' }}
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
                    <TouchableOpacity style={styles.modalOption} onPress={toggleModal}>
                        <Text style={styles.modalOptionText}>View Profile Picture</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalCloseButton} onPress={toggleModal}>
                        <Text style={styles.modalCloseButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
                </TouchableWithoutFeedback>
            </Modal>
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
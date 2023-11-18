// import React, {useState, useEffect} from 'react'; 
// import { View, Text, StyleSheet } from 'react-native'; 
// import { auth, firestore, storage } from '../firebase';

// const CreatePostScreen = () => {
//     const [ caption, setCaption ] = useState(''); 
//     const [ image, setImage ] = useState(null); 
//     const [ user, setUser ] = useState(null); 

//     useEffect(() => {
//         const unsubscribe = auth.onAuthStateChanged((user) => {
//             if (user) 
//             {
//                 // if user successfully signed in
//                 setUser(user); 
//             }
//             else
//             {
//                 // No user sign in
//                 setUser(null); 
//             }
//         }); 

//         return () => unsubscribe(); 
//     }); 

//     const getUser = async (uid) => {
//         try {
//             const userDoc = await firestore.collection('users').doc(uid).get(); 
//             if (userDoc.exist) 
//             {
//                 const userData = userDoc.data; 
//                 return userData
//             }
//         } 
//         catch (error)
//         {
//             console.error('Error fetching the data: ', error.message); 
//         }
//     }; 

//     return (
//         <View style={styles.container}>
//             {user && (
//                 <CreatePostHeader 
//                 username={user.firstName} 
//                 // profileImage={image.profileImage} 
//                 />
//             )}
//         </View>
//     );
// };

// const CreatePostHeader = ({ username, profileImage }) => {
//     return (
//         <View style = {styles.header}> 
//             {postImage && <Image source={{ uri: profileImage }} style={styles.profileImage} /> }
//             <Text style={styles.username}>username</Text>
//         </View>
//     ); 
// }; 
 
// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     header: {
//         flexDirection: 'row', 
//         justifyContent: 'space-between',
//         margin: 5, 
//         alignItems: 'center', 
//     }, 
//     profileImage: {
//         width: 35, 
//         height: 35, 
//         borderRadius: 50, 
//         marginLeft: 6, 
//         borderWidth: 1.6, 
//         borderColor: '#ff8501', 
//     }, 
//     username: {
//         color: '#333363', 
//         marginLeft: 5, 
//         fontWeight: '700', 
//     }
// });

// export default CreatePostScreen; 

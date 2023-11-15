import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import Post from '../navigation/Post';
import Header from '../navigation/Header';


const HomeScreen = () => {
  return (
    /* Header of HomeScreen */
    <View style={styles.container}>
      <View style={styles.headerBackground}> 
        <Header />
      </View>  
      {/* Display all post */}
      <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {/* Render the test post */}
          {testPost.map((post, index) => (
            <Post post={post} key={index} />
          ))}
        </ScrollView>
        {/* <BottomTab icons={bottomTabIcons}/> */}
      </SafeAreaView>
      </GestureHandlerRootView>
    </View> 
  );
};

// test case for profile
const User = [
  {
    username: 'khoinguyen',
    image: 'https://firebasestorage.googleapis.com/v0/b/car-project-b12f9.appspot.com/o/PostImage%2Fcar.jpg?alt=media&token=7f8ea8e3-453d-4abf-9b29-5c9cf1b2dac9&_gl=1*16iee3m*_ga*OTc2OTg5NDQ4LjE2OTQxMDI5NDg.*_ga_CW55HF8NVT*MTY5ODI5NTQ5MC4yMC4xLjE2OTgyOTU1NjMuNDcuMC4w',
  }, 
  {
    username: 'hungcao', 
    image: 'https://firebasestorage.googleapis.com/v0/b/car-project-b12f9.appspot.com/o/PostImage%2Fcyper_punk.jpg?alt=media&token=5b6b1f18-d20d-4bdf-a9cb-b1f35a75408e&_gl=1*1cnnixz*_ga*OTc2OTg5NDQ4LjE2OTQxMDI5NDg.*_ga_CW55HF8NVT*MTY5ODI5NTQ5MC4yMC4xLjE2OTgyOTU3MDUuNjAuMC4w' }
];

const testPost = [
  {
    username: User[0].username, 
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/car-project-b12f9.appspot.com/o/PostImage%2Fcar.jpg?alt=media&token=7f8ea8e3-453d-4abf-9b29-5c9cf1b2dac9&_gl=1*16iee3m*_ga*OTc2OTg5NDQ4LjE2OTQxMDI5NDg.*_ga_CW55HF8NVT*MTY5ODI5NTQ5MC4yMC4xLjE2OTgyOTU1NjMuNDcuMC4w', 
    likes: 12431, 
    caption: 'Back to HomeTown', 
    profile_picture: User[0].image, 
    comments: [
        {
            username: 'khoinguyen', 
            comment: 'Wow', 
        }, 
        {
          username: 'khoinguyen', 
          comment: 'Wow', 
        }, 
        {
          username: 'khoinguyen', 
          comment: 'Wow', 
        }, 
    ],
  },

  {
    username: User[1].username, 
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/car-project-b12f9.appspot.com/o/PostImage%2Fcyper_punk.jpg?alt=media&token=5b6b1f18-d20d-4bdf-a9cb-b1f35a75408e&_gl=1*1cnnixz*_ga*OTc2OTg5NDQ4LjE2OTQxMDI5NDg.*_ga_CW55HF8NVT*MTY5ODI5NTQ5MC4yMC4xLjE2OTgyOTU3MDUuNjAuMC4w', 
    likes: 12431, 
    caption: 'Back to HomeTown', 
    profile_picture: User[1].image, 
    comments: [
        {
            username: 'khoinguyen', 
            comment: 'Wow', 
        }, 
    ],
  },
];

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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emailText: {
    fontSize: 16,
    marginBottom: 20,
  },
  newMessageButton: {
    position: 'absolute',
    marginTop: 60,
    marginLeft: 10,
    padding: 5,
    borderRadius: 20,
    alignItems: 'center',
  },
  signOutButtonText: {
    color: '#333363',
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'flex-end',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingVertical: 10,
  },
  footerButton: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
  footerButtonText: {
    color: '#333363',
    fontSize: 12,
    fontWeight: 'bold',
  },
  newPostButton: {
    alignItems: 'center',
    marginTop: -10,
    bottom: 23,
  },
});
              
export default HomeScreen;

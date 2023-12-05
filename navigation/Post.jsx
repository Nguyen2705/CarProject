import React, { useState } from 'react'; 
import { View, Text, StyleSheet, Image } from 'react-native'; 
import { Divider } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome, MaterialCommunityIcons, AntDesign, Octicons } from '@expo/vector-icons'; 
import { auth, firestore, storage } from '../firebase';
import { ref, getDownloadURL } from "firebase/storage";
import { doc, getDoc } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

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

            {/* <View  style={{ flexDirection: 'row', alignItems: 'center'}}>
                {currentUser && (
                <>
                    <Image 
                    source={{ uri: imageURL || 'https://firebasestorage.googleapis.com/v0/b/car-project-b12f9.appspot.com/o/profileImage%2Fdefault.png?alt=media&token=e2443c3b-fc13-4eff-8533-e7c6504dc737'}} 
                    style={styles.icon} />

                    <Text style={{ color: '#333363', marginLeft: 5, fontWeight: '700'}}> {`${username}`} </Text>
                </>
                )}
            </View> */}

            <Text style={{ color: '#333363', fontWeight: '900' }}>...</Text>
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
})

export default Post;

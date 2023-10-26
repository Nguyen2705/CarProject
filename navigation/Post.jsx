import React, { useState } from 'react'; 
import { View, Text, StyleSheet, Image } from 'react-native'; 
import { Divider } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome, MaterialCommunityIcons, AntDesign, Octicons } from '@expo/vector-icons'; 

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
                <Comment post= {post} />
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
                <Image source={{ uri: post.profile_picture }} style={styles.icon}/> 
                <Text style={{ color: '#333363', marginLeft: 5, fontWeight: '700'}}>
                    {post.username}
                </Text>
            </View>

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
                // can be change to get the image from the user when they insert the image in the create post function
                source={{uri: post.imageUrl}}
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
                {/* <TouchableOpacity onPress={change}>
                    {isActive ? (defaultIcon) : (changeIcon)}
                </TouchableOpacity> */}
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
            {post.likes.toLocaleString('en')} likes
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

// post.comments.length = 0 or 1 opr 2
// 0: false
// 1: true

const CommentSection = ({ post }) => (
    <View style={{ marginTop: 5 }}>
        {!!post.comments.length && (
            <Text style={{ color: 'gray' }}>   
            {/* 1 comment => render component without 'all' and singular comment
                2 comments => render component with 'all' and plural comment */}
                View{post.comments.length > 1 ? ' all' : ''} {post.comments.length}{' '}
                {post.comments.length > 1 ? 'comments' : 'comment'}
            </Text>
        )}
    </View>
)

const Comment = ({ post }) => (
    <>
        {post.comments.map((comment, index) => (
            <View key={index} style={{ flexDirection: 'row', marginTop: 10 }}>
                <Text style={{ color: '#333363' }}>
                    <Text style={{ fontWeight: '600' }}>{comment.username}</Text>{' '}
                    {comment.comment}
                </Text>
            </View>
        ))}
    </>
)

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
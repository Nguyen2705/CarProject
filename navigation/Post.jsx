import React, { useState } from 'react'; 
import { View, Text, StyleSheet, Image } from 'react-native'; 
import { Divider } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome, MaterialCommunityIcons, AntDesign, Octicons } from '@expo/vector-icons'; 

const Post = ({ post }) => {
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
    const [isFollowing, setIsFollowing] = useState(false);

    const onFollowPress = () => {
        handleFollowing(post.uid, isFollowing);
        setIsFollowing(!isFollowing);
    };

    const timestamp = new Date(post.timestamp.seconds * 1000);
      
    return (
        <View  style={{ flexDirection: 'row' }}>
            <Image source={{ uri: post.userImage }} style={styles.icon} />
            
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginLeft: 10, marginTop: Platform.OS == 'ios' ? 10 : -40 }}>
                <Text style={{ color: '#333363', fontWeight: '700'}}>
                    {post.username}
                </Text>
                <Text style={{ color: '#333363', fontSize: 10, flexDirection: 'column'}}>
                    {timestamp.toLocaleString()} 
                </Text>
            </View>

            <View style={{ 
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 145,
                marginTop: Platform.OS == 'ios' ? 10 : -40, 
                }}
            >
                <TouchableOpacity style={styles.followingButton} onPress={() => onFollowPress(post.uid, isFollowing)}>
                    <Text style={styles.followingButtonText}>
                        {isFollowing ? 'Unfollow' : 'Follow +'}
                    </Text>
                </TouchableOpacity>
            </View>
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
        marginTop: Platform.OS == 'ios' ? 10 : -40, 
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

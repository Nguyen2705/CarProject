import React from 'react'; 
import { View, Text, StyleSheet, Image } from 'react-native'; 
import { Divider } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Post = ({ post }) => {
    return ( 
        <View style={{ marginBottom: 30 }}>
            <Divider width={1} orientation='vertical' />
            <PostHeader post={post} />
            <PostImage post={post} />
            <View style={{ marginHorizontal: 15, marginTop: 10}}>
                <PostFooter />
                <Likes post={post} />
                <Caption post={post} />
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
                <Text style={{ color: 'white', marginLeft: 5, fontWeight: '700'}}>
                    {post.username}
                </Text>
            </View>

            <Text style={{ color: 'white', fontWeight: '900' }}>...</Text>
        </View>
    ); 
}; 

const PostImage = ({ post }) => {
    return (
        <View 
            style={{
                width: '100%', 
                height: 450
            }}
        >
            <Image 
                // can be change to get the image from the user when they insert the image in the create post function
                source={{uri: post.imageUrl}}
                style={{ height: '100%', resizeMode: 'cover' }}
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
                    <Image source={require('../assets/heart.png')} style={{width: 40, height: 30}} />
                </TouchableOpacity>
                {/* Comment Button  */}
                <TouchableOpacity onPress={() => {}}>
                    <Image source={require('../assets/comment.png')} style={{width: 30, height: 30}} />
                </TouchableOpacity>
                {/* Send Post */}
                <TouchableOpacity onPress={() => {}}>
                    <Image source={require('../assets/send.png')} style={{ width: 35, height: 30}} />
                </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'flex-end' }}>
                {/* Save Post */}
                <TouchableOpacity onPress={() => {}}>
                    <Image source={require('../assets/save.png')} style={{ width: 35, height: 30}} />
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
        <Text style={{ color: 'white' }}>
            <Text style={{fontWeight: '600'}}>{post.username} </Text>
            <Text>{post.caption}</Text>
        </Text>
    </View>
)

// const Comment = ({ post }) => (
    
// )

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
    leftFooterIconsContainer: {
        flexDirection: 'row', 
        width: '32%', 
        justifyContent: 'space-between', 
    }, 
})
export default Post; 
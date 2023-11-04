import React from 'react'; 
import { View, Text, StyleSheet } from 'react-native'; 

const NotificationScreen = () => {
    return (
        <View style={styles.container}>
        <Text>Notification Screen Content Goes Here</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
});

export default NotificationScreen; 

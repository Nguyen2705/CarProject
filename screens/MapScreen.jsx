import React from 'react'; 
import { View, Text, StyleSheet } from 'react-native'; 

const MapScreen = () => {
    return (
        <View style={styles.container}>
        <Text>Map Screen Content Goes Here</Text>
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

export default MapScreen; 

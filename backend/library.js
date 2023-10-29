import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function LibraryScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need media library permissions to make this work!');
          // Redirect back to ProfileScreen when permission is denied
          navigation.goBack();
        } else {
          // Automatically open the image picker
          pickImage();
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.selectedImage} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

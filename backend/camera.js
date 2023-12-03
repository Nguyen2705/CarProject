import React from 'react';
import { Camera } from 'expo-camera';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

export default function CameraScreen() {
  const navigation = useNavigation();

  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to the camera</Text>;
  }

  function toggleCameraType() {
    setType((currentType) =>
      currentType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  }

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync(null);
      setCapturedImage(photo.uri);
      setPreviewVisible(true);
      console.log(photo);
    }
  };

  const savePicture = () => {
    console.log('Save the picture logic here');
   
    setCapturedImage(null);
    setPreviewVisible(false);
  };

  const discardPicture = () => {
    // Discard the captured image and hide the preview
    setCapturedImage(null);
    setPreviewVisible(false);
    //navigation.goBack(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        ref={(ref) => setCameraRef(ref)}
        ratio="16:9"
      >
        <View style={styles.header}>
          {/* Add a transparent header here */}
        </View>
        <View style={styles.cameraContainer}>
          {capturedImage && previewVisible ? (
            <Image source={{ uri: capturedImage }} style={styles.selectedImage} resizeMode="cover" />
          ) : (
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}></TouchableOpacity>
          )}

        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              discardPicture();
              navigation.goBack();
            }}
          >
            <Ionicons name='arrow-back' size={32} color="white" />
          </TouchableOpacity>
          {previewVisible ? (
            <>
              <TouchableOpacity style={styles.icon} onPress={savePicture}>
                <Ionicons name="checkmark" size={32} color="white" />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.icon}
              onPress={toggleCameraType}
            >
              <Ionicons name="camera-reverse" size={32} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </Camera>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    //backgroundColor: 'rgba(0, 0, 0, 0.3)', // Transparent background
    height: '7%',
  },
  cameraContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  captureButton: {
    backgroundColor: '#faca63',
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: 'white',
    marginBottom: 30,
  },
  iconsContainer: {
    position: 'absolute',
    top: '2%',
    left: 0,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    marginTop: 50,
  },
  icon: {
    padding: 10,
  },
});

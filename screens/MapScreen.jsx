import React, { useState, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Modal, Text, Button, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const MapScreen = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const mapViewRef = useRef(null);
  const autocompleteRef = useRef(null);  // Ref for GooglePlacesAutocomplete

  const moveMapToLocation = (location) => {
    if (mapViewRef.current) {
      const { lat, lng } = location;
      const region = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
      mapViewRef.current.animateToRegion(region, 1000);
    } else {
      console.error('MapView reference is not available.');
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const resetSelection = () => {
    setSelectedLocation(null);
    setModalVisible(false);
    if (autocompleteRef.current) {
      autocompleteRef.current.setAddressText(''); // Clear the text input
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <GooglePlacesAutocomplete
            ref={autocompleteRef}  // Attach the ref here
            placeholder="Search for a place"
            onPress={(data, details = null) => {
              setSelectedLocation({
                name: details.name,
                geometry: { location: { lat: details.geometry.location.lat, lng: details.geometry.location.lng } },
                formatted_address: details.formatted_address,
              });
              moveMapToLocation(details.geometry.location);
              setModalVisible(true);
            }}
            query={{
              key: 'AIzaSyBX-tBieIumRoqv28A4bUhcefwT7-7dv4c', // Replace with your Google API Key
              language: 'en',
            }}
            fetchDetails={true}
            styles={{
              textInput: styles.input,
            }}  
          />
        </View>

        <MapView
          ref={mapViewRef}
          style={styles.map}
          initialRegion={{
            latitude: 32.705002,
            longitude: -97.122780,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {selectedLocation && (
            <Marker
              coordinate={{
                latitude: selectedLocation.geometry.location.lat,
                longitude: selectedLocation.geometry.location.lng,
              }}
              title={selectedLocation.name}
              description={selectedLocation.formatted_address}
            />
          )}
        </MapView>

        <Modal visible={modalVisible} animationType="slide" >
          <View style={styles.modalContainer}>
            <Text style={styles.placeName}>{selectedLocation?.name}</Text>
            <Text style={styles.placeAddress}>{selectedLocation?.formatted_address}</Text>
            <Button title="Close" onPress={closeModal} />
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 35 : 6,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    top: 17,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeAddress: {
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#faca63',
    borderRadius: 15,
    padding: 10,
    left: 3,  
  },
  cancelButtonText: {
    color: '#333363',
  },
});

export default MapScreen;

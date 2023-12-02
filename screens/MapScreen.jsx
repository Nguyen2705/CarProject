import React, { useState, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, TextInput, Button, Modal, Text, TouchableOpacity } from 'react-native';

const MapScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const mapViewRef = useRef(null);

  const handleSearch = async () => {
    try {
      // Your API key here
      const apiKey = 'AIzaSyBX-tBieIumRoqv28A4bUhcefwT7-7dv4c';
      const encodedQuery = encodeURIComponent(searchQuery);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodedQuery}&key=${apiKey}`
      );
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    setModalVisible(true);
    moveMapToLocation(location);
  };

  const moveMapToLocation = (location) => {
    if (mapViewRef.current) {
      const { lat, lng } = location.geometry.location;
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

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search for a place"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
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

        {searchResults.map((result) => (
          <Marker
            key={result.place_id}
            coordinate={{
              latitude: result.geometry.location.lat,
              longitude: result.geometry.location.lng,
            }}
            title={result.name}
            description={result.formatted_address}
            onPress={() => handleSelectLocation(result)}
          />
        ))}
      </MapView>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text>{selectedLocation?.name}</Text>
          <Text>{selectedLocation?.formatted_address}</Text>
          <Button title="Close" onPress={closeModal} />
        </View>
      </Modal>
    </View>
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
    paddingHorizontal: Platform.OS === 'ios' ? 25 : 20,
    paddingVertical: Platform.OS === 'ios' ? 40 : 10,
    top: Platform.OS === 'ios' ? 0 : 0,
    backgroundColor: 'white',
    
  },
  input: {
    flex: 1,
    marginRight: 10,
    top: Platform.OS === 'ios' ? 25 : 0,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  searchButton: {
    backgroundColor: '#faca63',
    borderRadius: 15,
    padding: 10,
    top: Platform.OS === 'ios' ? 25 : 0,
  },
  searchButtonText: {
    color: '#333363',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapScreen;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.card}>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Welcome to the Home Page</Text>
            <Text style={styles.cardText}>
              This is the home page content. You can customize and display
              information, features, or any other content relevant to your application.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  card: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  cardBody: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;

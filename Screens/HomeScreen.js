import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground source={require('../assets/bread-color-copyspace-1565982.jpg')} style={styles.background}>
      <View style={styles.container}>
        {/* Add GIF as an Image */}
        <Image source={require('../assets/MNx.gif')} style={styles.gif} />
        
        <Text style={styles.title}>Welcome to Food App</Text>
        <Button title="Go to Menu" onPress={() => navigation.navigate('Menu')} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center', // Center content inside the container
  },
  gif: {
    width: 150, // Width of the GIF
    height: 150, // Height of the GIF
    marginBottom: 20, // Space below the GIF
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

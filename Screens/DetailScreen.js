import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function DetailScreen({ route, navigation }) {
  const { food } = route.params; // Get the food name from route parameters

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{food}</Text>
      <Text style={styles.description}>Delicious {food} made with fresh ingredients.</Text>
      
      {/* Button to navigate to the next screen */}
      <Button
        title="Add to Cart"
        onPress={() => {
          navigation.navigate('Cart', { food }); // Navigate to Cart screen and pass food data
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
  },
});

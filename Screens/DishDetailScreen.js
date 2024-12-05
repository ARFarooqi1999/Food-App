import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function DishDetailScreen({ route, navigation }) {
  const { dish } = route.params; // Get the dish information from navigation params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{dish.name}</Text> {/* Display the dish name */}
      <Text style={styles.description}>Here is the detail about the dish.</Text> {/* Dish details text */}
      
      {/* Button to add the dish to the cart and navigate to CartScreen */}
      <Button
        title="Add to Cart"
        onPress={() => {
          navigation.navigate('Cart', { dish }); // Navigate to Cart with the selected dish as parameter
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
    marginBottom: 20,
  },
});

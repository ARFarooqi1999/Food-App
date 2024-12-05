import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

const dishes = [
  { id: '1', name: 'Pizza' },
  { id: '2', name: 'Burger' },
  { id: '3', name: 'Pasta' },
  { id: '4', name: 'Salad' },
  { id: '5', name: 'Dessert' },
];

export default function DishListScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <FlatList
        data={dishes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Button title="View" onPress={() => navigation.navigate('DishDetail', { dish: item })} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  item: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#f9c2ff',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

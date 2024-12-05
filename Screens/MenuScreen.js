import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function MenuScreen({ navigation }) {
  const foodTypes = ['Pizza', 'Burger', 'Pasta', 'Salad', 'Dessert'];

  return (
    <View style={styles.container}>
      {foodTypes.map((food, index) => (
        <View key={index} style={styles.button}>
          <Button title={food} onPress={() => navigation.navigate('Detail', { food })} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginVertical: 10,
    width: '80%',
  },
});

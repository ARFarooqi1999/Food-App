import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function OrderCompleteScreen({ navigation }) {
  return (
    <View style={styles.container}>
        
      <Text style={styles.title}>Order Complete!</Text>
      <Text>Your food is on the way.</Text>
      <Button
        title="Go Back to Menu"
        onPress={() => navigation.navigate('DishList')}
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
});

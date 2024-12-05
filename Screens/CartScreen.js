import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios'; // Import axios for making requests

export default function CartScreen({ navigation }) {
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Doner',
      size: 'Medium size',
      sauce: 'Orange sauce',
      price: 5,
      quantity: 1,
      image: require('../assets/doner-kebab-7610073_1280.jpg'),
    },
    // other items...
  ]);

  const incrementQuantity = (item) => {
    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  const decrementQuantity = (item) => {
    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.id === item.id && cartItem.quantity > 1
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      )
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  // Function to handle order confirmation
  const confirmOrder = async () => {
    const orderData = {
      items: cartItems,
      total: calculateTotal(),
      pickupTime: '14:30', // Replace with dynamic time if needed
      reminder: '30 min',  // Replace with dynamic time if needed
    };

    try {
      const response = await axios.post('http://your-api-url/create', orderData); // Replace with your backend URL
      if (response.status === 201) {
        Alert.alert('Order confirmed', 'Your order has been placed successfully!');
        navigation.navigate('OrderComplete'); // Navigate to the next screen
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'There was an issue confirming your order.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Cart Items List */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemInfo}>{item.size}</Text>
              <Text style={styles.itemInfo}>{item.sauce}</Text>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => decrementQuantity(item)}>
                <Text style={styles.quantityControl}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => incrementQuantity(item)}>
                <Text style={styles.quantityControl}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.price}>€{item.price.toFixed(2)}</Text>
          </View>
        )}
      />

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.timeContainer}>
          <Text style={styles.pickupText}>Pick up time</Text>
          <Text style={styles.pickupTime}>14:30</Text>
        </View>
        <View style={styles.reminderContainer}>
          <Text style={styles.reminderText}>Reminder</Text>
          <Text style={styles.reminderTime}>30 min</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalAmount}>€{calculateTotal().toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.confirmButton} onPress={confirmOrder}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  cartItem: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemInfo: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityControl: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    color: '#000',
  },
  quantity: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomSection: {
    backgroundColor: '#FFC300',
    padding: 15,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickupText: {
    fontSize: 16,
  },
  pickupTime: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reminderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  reminderText: {
    fontSize: 16,
  },
  reminderTime: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

// Importing API functions
import { getItems, addItem } from './api';

// Screens
import HomeScreen from './Screens/HomeScreen';
import MenuScreen from './Screens/MenuScreen';
import DetailScreen from './Screens/DetailScreen';
import DishListScreen from './Screens/DishListScreen';
import DishDetailScreen from './Screens/DishDetailScreen';
import CartScreen from './Screens/CartScreen';
import OrderCompleteScreen from './Screens/OrderCompleteScreen';
import Register from './Screens/Register'; // Import RegisterScreen

const Stack = createStackNavigator();

// Login Screen
const LoginScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement login logic here (optional)
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

// Register Screen
const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !phone || !password) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    if (phone.length !== 11) {
      Alert.alert('Error', 'Phone number must be exactly 11 digits.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.100.10:5000/api/users/register', {
        name,
        email,
        phone,
        password,
      });

      if (response.status === 201) {
        Alert.alert('Success', 'Successfully registered!');
        navigation.navigate('Login'); // Navigate to Login after success
      }
    } catch (error) {
      console.error('Error during registration:', error);
      Alert.alert('Error', 'Registration failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        keyboardType="numeric"
        maxLength={11}
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

// ItemsListScreen
const ItemsListScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getItems();
      setItems(data);
    }
    fetchData();
  }, []);

  const handleAddItem = async () => {
    const newItem = { name: 'New Item', price: 10 };
    await addItem(newItem);
    setItems(await getItems());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Items List</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Text style={styles.itemText}>
            {item.name} - ${item.price}
          </Text>
        )}
      />
      <Button title="Add Item" onPress={handleAddItem} />
    </View>
  );
};

// App Component
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        {/* Auth Screens */}
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* Main Screens */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="DishList" component={DishListScreen} />
        <Stack.Screen name="DishDetail" component={DishDetailScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="OrderComplete" component={OrderCompleteScreen} />
        
        {/* Items List Screen */}
        <Stack.Screen name="ItemsList" component={ItemsListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: '100%',
  },
  itemText: {
    fontSize: 16,
    marginVertical: 5,
  },
});

// RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // You can install this if not already

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(true); // New state to track phone number validity

  const handleRegister = async () => {
    // Check if all fields are filled
    if (!name || !email || !phone || !password) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    // Validate phone number length
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

  const handlePhoneChange = (text) => {
    if (text.length <= 11) {
      setPhone(text);
      setIsPhoneValid(text.length === 11); // Check if phone number is valid
    }
  };

  const isFormValid = name && email && phone && password && isPhoneValid; // Disable button if form is invalid

  return (
    <ImageBackground 
    source={require('../assets/wp6592308.jpg')} // Add your desired image URL here
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="account" size={20} color="#999" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="email" size={20} color="#999" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="phone" size={20} color="#999" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            keyboardType="numeric"
            maxLength={11}
            value={phone}
            onChangeText={handlePhoneChange}
          />
        </View>
        {!isPhoneValid && phone.length > 0 && (
          <Text style={styles.errorText}>Phone number must be exactly 11 digits.</Text>
        )}
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="lock" size={20} color="#999" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity 
          style={[styles.button, {backgroundColor: isFormValid ? '#4CAF50' : '#9E9E9E'}]}
          onPress={handleRegister} 
          disabled={!isFormValid}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255)', // semi-transparent background for readability
    elevation: 5, // Adds a shadow for a floating effect
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingHorizontal: 10,
    color: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4CAF50', // Default color
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;

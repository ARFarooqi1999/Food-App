import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './navigation/TabNavigator'; // Tab Navigator for Home, Menu, and Dishes
import DishDetailScreen from './Screens/DishDetailScreen';
import CartScreen from './Screens/CartScreen';
import OrderCompleteScreen from './Screens/OrderCompleteScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TabNavigator">
        {/* Main Tabs (Home, Menu, DishList) */}
        <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />

        {/* Stack screens for Dish details, Cart, and Order completion */}
        <Stack.Screen name="DishDetail" component={DishDetailScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="OrderComplete" component={OrderCompleteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

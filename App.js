import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppBar from './src/components/appbar';
import MenuBar from './src/components/menubar';
import ViewProduct from './src/pages/view-product';
import EditProduct from './src/pages/edit-product';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={MenuBar}/>
        <Stack.Screen name="ViewProduct" component={ViewProduct}/>
        <Stack.Screen name="EditProduct" component={EditProduct}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

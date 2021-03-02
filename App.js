import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppBar from './src/components/Appbar';
import MenuBar from './src/components/Menubar';
import ViewProduct from './src/pages/ViewProduct';
import EditProduct from './src/pages/EditProduct';
import { Provider } from 'react-redux';
import store from './src/redux/store';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={MenuBar}/>
          <Stack.Screen name="ViewProduct" component={ViewProduct}/>
          <Stack.Screen name="EditProduct" component={EditProduct}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

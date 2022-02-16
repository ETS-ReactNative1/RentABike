import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { LoginScreen } from './Screens/LoginScreen';
import { SingupScreen } from './Screens/SingupScreen';
import { StyleSheet, Text, View } from 'react-native';
import { HomeScreen } from './Screens/HomeScreen';
import { TypeOfUser } from './Components/TypeOfUser';

const Stack = createNativeStackNavigator()

const MyStack = () => (
  <Stack.Navigator>
    <Stack.Screen name='SingupScreen' component={SingupScreen}/>
    <Stack.Screen name='LoginScreen' component={LoginScreen}/>
    <Stack.Screen name='HomeScreen' component={HomeScreen}/>
    <Stack.Screen name='TypeOfUser' component={TypeOfUser}/>
  </Stack.Navigator>
)

export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

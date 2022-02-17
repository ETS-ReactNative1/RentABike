import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import NavigationStack from './src/navigation/NavigationStack';
import RentTabNavigation from './src/navigation/RentTabNavigation';

export default function App() {
  return (
    <NavigationContainer>
      {/* <NavigationStack /> */}
      <RentTabNavigation />
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

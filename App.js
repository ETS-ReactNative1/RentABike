import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer for a long period of time']);
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
/* import { initStripe } from '@stripe/stripe-react-native'; */
import { StripeProvider } from '@stripe/stripe-react-native';

import NavigationStack from './src/navigation/NavigationStack';
import RentTabNavigation from './src/navigation/RentTabNavigation';
import { publishableKey } from './config/secret';
import { store } from './src/store';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={publishableKey}>
        <NavigationContainer>
          <NavigationStack />
        </NavigationContainer>
      </StripeProvider>
    </Provider>
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

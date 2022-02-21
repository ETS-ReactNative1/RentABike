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
import { publishableKey } from './config/secret'; // cambiar xddd

export default function App() {
  /*   const [publishableKey, setPublishableKey] = useState('');
  const fetchPublishableKey = async () => {
    const key = await fetchKey(); // fetch key from your server here
    setPublishableKey(key);
  };
  useEffect(() => {
    fetchPublishableKey();
  }, []); */
  /*   useEffect(() => {
    initStripe({
      publishableKey: publishableKey,
      merchantIdentifier: 'merchant.identifier',
    });
  }, []); */
  return (
    <StripeProvider publishableKey={publishableKey}>
      <NavigationContainer>
        <NavigationStack />
      </NavigationContainer>
    </StripeProvider>
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

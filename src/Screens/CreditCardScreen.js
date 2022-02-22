import { View, Text } from 'react-native';
import React from 'react';
import { CreditCard } from '../Components/CreditCard';

export default function CreditCardScreen({ navigation, route }) {
  return <CreditCard navigation={navigation} route={route} />;
}

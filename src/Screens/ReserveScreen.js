import { View, Text } from 'react-native';
import React from 'react';
import { Reserve } from '../Components/Reserve';

export function ReserveScreen({ navigation, route }) {
  return <Reserve navigation={navigation} route={route} />;
}

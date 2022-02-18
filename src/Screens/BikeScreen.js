import { View, Text } from 'react-native';
import React from 'react';
import { Bike } from '../Components/Bike/';

export function BikeScreen({navigation, route}) {
  return (
      <Bike navigation={navigation} route={route}/>
  );
}

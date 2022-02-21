import { View, Text } from 'react-native';
import React from 'react';
import { CreateBike } from '../Components/CreateBike';

export function CreateBikeScreen({ navigation, route }) {
  return <CreateBike navigation={navigation} route={route} />;
}

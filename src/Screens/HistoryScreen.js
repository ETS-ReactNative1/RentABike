import { View, Text } from 'react-native';
import React from 'react';
import { History } from '../Components/History';

export function HistoryScreen({ navigation, route }) {
  return <History navigation={navigation} route={route} />;
}

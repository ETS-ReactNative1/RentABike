import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { CreateForm } from './CreateForm';

export function CreateBike(props) {
  const {
    navigation,
    route: { params },
  } = props;
  return (
    <SafeAreaView style={{ backgroundColor: '#e6e6e6' }}>
      <CreateForm params={params}/>
    </SafeAreaView>
  );
}

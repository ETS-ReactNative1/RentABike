import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { CreateForm } from './CreateForm';
import { colors } from '../../colors';

export function CreateBike(props) {
  const {
    navigation,
    route: { params },
  } = props;
  return (
    <SafeAreaView style={{ backgroundColor: colors.background }}>
      <CreateForm params={params} />
    </SafeAreaView>
  );
}

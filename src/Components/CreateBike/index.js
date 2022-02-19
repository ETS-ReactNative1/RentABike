import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { CreateForm } from './CreateForm';

export function CreateBike() {
  return (
    <SafeAreaView>
      <CreateForm />
    </SafeAreaView>
  );
}

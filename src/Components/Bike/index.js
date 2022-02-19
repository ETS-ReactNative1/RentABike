import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';

export function Bike(props) {
  const {navigation, route:{params}} = props
    console.log("params.id :", params.id);
    console.log("params.owner :", params.owner);
/*     console.log("route :", route);
    console.log("navigation :", navigation); */
  return (
    <SafeAreaView>
      <Text>Bike</Text>
    </SafeAreaView>
  );
}

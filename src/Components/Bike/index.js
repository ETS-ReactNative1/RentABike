import { View, Text } from 'react-native';
import React from 'react';

export function Bike(props) {
  const {navigation, route:{params}} = props
    console.log("params.id :", params.id);
    console.log("params.owner :", params.owner);
/*     console.log("route :", route);
    console.log("navigation :", navigation); */
  return (
    <View>
      <Text>Bike</Text>
    </View>
  );
}

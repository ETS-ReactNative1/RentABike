import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../Screens/LoginScreen';
import { SingupScreen } from '../Screens/SingupScreen';
import { RenterHomeScreen } from '../Screens/RenterHomeScreen';
import { TypeOfUser } from '../Screens/TypeOfUserScreen';

const Stack = createNativeStackNavigator()
const NavigationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='LoginScreen' component={LoginScreen} />
      <Stack.Screen name='SingupScreen' component={SingupScreen} />
      <Stack.Screen name='TypeOfUserScreen' component={RenterHomeScreen} />
      {/* <Stack.Screen name='TypeOfUserScreen' component={TypeOfUserScreen}/> */}
    </Stack.Navigator>
  );
};

export default NavigationStack;

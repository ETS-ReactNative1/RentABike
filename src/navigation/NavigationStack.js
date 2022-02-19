import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../Screens/LoginScreen';
import { SingupScreen } from '../Screens/SingupScreen';
import { RenterHomeScreen } from '../Screens/RenterHomeScreen';
import { TypeOfUserScreen } from '../Screens/TypeOfUserScreen';
import RentTabNavigation from './RentTabNavigation';
import { BikeScreen } from '../Screens/BikeScreen';
import { CreateBikeScreen } from '../Screens/CreateBikeScreen';

const Stack = createNativeStackNavigator();
const NavigationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='LoginScreen' component={LoginScreen} />
      <Stack.Screen name='SingupScreen' component={SingupScreen} />
      <Stack.Screen name='TypeOfUserScreen' component={TypeOfUserScreen} />
      <Stack.Screen name='RentTabNavigation' component={RentTabNavigation} />
      <Stack.Screen name='BikeScreen' component={BikeScreen} />
      <Stack.Screen name='CreateBikeScreen' component={CreateBikeScreen} />
    </Stack.Navigator>
  );
};

export default NavigationStack;

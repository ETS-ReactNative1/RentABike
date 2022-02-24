import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../Screens/LoginScreen';
import { SingupScreen } from '../Screens/SingupScreen';
import { RenterHomeScreen } from '../Screens/RenterHomeScreen';
import { TypeOfUserScreen } from '../Screens/TypeOfUserScreen';
import RentTabNavigation from './RentTabNavigation';
import { BikeScreen } from '../Screens/BikeScreen';
import { CreateBikeScreen } from '../Screens/CreateBikeScreen';
import CreditCardScreen from '../Screens/CreditCardScreen';
import { Button } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { ReserveScreen } from '../Screens/ReserveScreen';
import { HistoryScreen } from '../Screens/HistoryScreen';
import ChatScreen from '../Screens/ChatScreen';
import { header } from './header';

const Stack = createNativeStackNavigator();
const NavigationStack = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='LoginScreen'
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='SingupScreen'
        component={SingupScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='TypeOfUserScreen'
        component={TypeOfUserScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='RentTabNavigation'
        component={RentTabNavigation}
        options={header}
      />
      <Stack.Screen name='BikeScreen' component={BikeScreen} options={header} />
      <Stack.Screen
        name='ReserveScreen'
        component={ReserveScreen}
        options={header}
      />
      <Stack.Screen
        name='CreateBikeScreen'
        component={CreateBikeScreen}
        options={header}
      />
      <Stack.Screen
        name='HistoryScreen'
        component={HistoryScreen}
        options={header}
      />
      <Stack.Screen
        name='CreditCardScreen'
        component={CreditCardScreen}
        options={header}
      />
      <Stack.Screen name='ChatScreen' component={ChatScreen} options={header} />
    </Stack.Navigator>
  );
};

export default NavigationStack;

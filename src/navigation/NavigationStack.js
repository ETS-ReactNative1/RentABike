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
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { ReserveScreen } from '../Screens/ReserveScreen';
import { HistoryScreen } from '../Screens/HistoryScreen';
import ChatScreen from '../Screens/ChatScreen';

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
        options={{
          title: 'RentaBike',
          headerStyle: {
            backgroundColor: '#465902',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <Icon
              name='arrow-left'
              color='#fff'
              size={24}
              style={{ marginLeft: 16, marginRight: 12 }}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <Stack.Screen
        name='BikeScreen'
        component={BikeScreen}
        options={{
          title: 'RentaBike',
          headerStyle: {
            backgroundColor: '#465902',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <Icon
              name='arrow-left'
              color='#fff'
              size={24}
              style={{ marginLeft: 16, marginRight: 12 }}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <Stack.Screen
        name='ReserveScreen'
        component={ReserveScreen}
        options={{
          title: 'RentaBike',
          headerStyle: {
            backgroundColor: '#465902',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <Icon
              name='arrow-left'
              color='#fff'
              size={24}
              style={{ marginLeft: 16, marginRight: 12 }}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <Stack.Screen
        name='CreateBikeScreen'
        component={CreateBikeScreen}
        options={{
          title: 'RentaBike',
          headerStyle: {
            backgroundColor: '#465902',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <Icon
              name='arrow-left'
              color='#fff'
              size={24}
              style={{ marginLeft: 16, marginRight: 12 }}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <Stack.Screen
        name='HistoryScreen'
        component={HistoryScreen}
        options={{
          title: 'RentaBike',
          headerStyle: {
            backgroundColor: '#465902',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <Icon
              name='arrow-left'
              color='#fff'
              size={24}
              style={{ marginLeft: 16, marginRight: 12 }}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <Stack.Screen
        name='CreditCardScreen'
        component={CreditCardScreen}
        options={{
          title: 'RentaBike',
          headerStyle: {
            backgroundColor: '#465902',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <Icon
              name='arrow-left'
              color='#fff'
              size={24}
              style={{ marginLeft: 16, marginRight: 12 }}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <Stack.Screen
        name='ChatScreen'
        component={ChatScreen}
        options={{
          title: 'RentaBike',
          headerStyle: {
            backgroundColor: '#465902',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <Icon
              name='arrow-left'
              color='#fff'
              size={24}
              style={{ marginLeft: 16, marginRight: 12 }}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default NavigationStack;

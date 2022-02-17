import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoginScreen } from '../Screens/LoginScreen';
import { SingupScreen } from '../Screens/SingupScreen';
import { RenterHomeScreen } from '../Screens/RenterHomeScreen';
import { TypeOfUser } from '../Screens/TypeOfUserScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const RentTabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='LoginScreen'
        component={LoginScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name='home' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='SingupScreen'
        component={SingupScreen}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ color, size }) => (
            <Icon name='comments' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='TypeOfUserScreen'
        component={RenterHomeScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name='user' color={color} size={size} />
          ),
        }}
      />
      {/* <Tab.Screen name='TypeOfUserScreen' component={TypeOfUserScreen}/> */}
    </Tab.Navigator>
  );
};

export default RentTabNavigation;

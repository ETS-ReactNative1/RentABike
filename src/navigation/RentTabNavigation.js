import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MessageScreen } from '../Screens/MessageScreen';
import { RenterHomeScreen } from '../Screens/RenterHomeScreen';
import { ProfileScreen } from '../Screens/ProfileScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const RentTabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='RenterHomeScreen'
        component={RenterHomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name='home' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='MessageScreen'
        component={MessageScreen}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ color, size }) => (
            <Icon name='comments' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='ProfileScreen'
        component={ProfileScreen}
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

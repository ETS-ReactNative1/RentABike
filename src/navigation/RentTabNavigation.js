import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MessageScreen } from '../Screens/MessageScreen';
import { RenterHomeScreen } from '../Screens/RenterHomeScreen';
import { OwnerHomeScreen } from '../Screens/OwnerHomeScreen';
import { ProfileScreen } from '../Screens/ProfileScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../colors';
import OwnerMessagesScreen from '../Screens/OwnerMessagesScreen';

const Tab = createBottomTabNavigator();

const RentTabNavigation = (props) => {
  const {
    navigation,
    route: { params },
  } = props;
  console.log('params.id :', params.type);
  return (
    <Tab.Navigator
      initialRouteName='RenterHomeScreen'
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.dark2,
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name='RenterHomeScreen'
        component={params.type === 'owner' ? OwnerHomeScreen : RenterHomeScreen}
        options={{
          tabBarActiveTintColor: colors.background,
          tabBarInactiveTintColor: colors.backgroundDarker,
          /* tabBarHideOnKeyboard, */
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name='home' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='MessageScreen'
        component={
          !params.type
            ? OwnerMessagesScreen
            : params.type === 'owner'
            ? OwnerMessagesScreen
            : MessageScreen
        }
        options={{
          headerShown: false,
          tabBarActiveTintColor: colors.background,
          tabBarInactiveTintColor: colors.backgroundDarker,
          /* tabBarHideOnKeyboard, */
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
          headerShown: false,
          tabBarActiveTintColor: colors.background,
          tabBarInactiveTintColor: colors.backgroundDarker,
          /* tabBarHideOnKeyboard, */
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

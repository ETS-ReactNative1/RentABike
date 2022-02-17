import { Link } from '@react-navigation/native';
import React from 'react';
import { LoginForm } from './LoginForm';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Login = ({ navigation }) => {
  return (
    <SafeAreaView>
      <LoginForm navigation={navigation} />
      <Link to={{ screen: 'SingupScreen' }}>New on RentABike? Sing up!</Link>
    </SafeAreaView>
  );
};

import React from 'react';
import { SingupForm } from './SingupForm';
import { View, Text, TextInput, Button } from 'react-native';
import { Link } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Singup = ({ navigation }) => {
  return (
    <SafeAreaView>
      <SingupForm navigation={navigation} />
      <Link to={{ screen: 'LoginScreen' }}>
        Do you have an account? Log in!
      </Link>
    </SafeAreaView>
  );
};

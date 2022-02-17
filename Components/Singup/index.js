import React from 'react';
import { SingupForm } from './SingupForm';
import { View, Text, TextInput, Button } from 'react-native';
import { Link } from '@react-navigation/native';

export const Singup = () => {
  return (
    <>
      <SingupForm />
      <Link to={{ screen: 'LoginScreen' }}>Do you have an account? Log in!</Link>
    </>
  );
};

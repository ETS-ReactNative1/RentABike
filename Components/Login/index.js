import { Link } from '@react-navigation/native';
import React from 'react';
import { LoginForm } from './LoginForm';

export const Login = () => {
  return (
    <>
      <LoginForm />
      <Link to={{ screen: 'SingupScreen' }}>New on RentABike? Sing up!</Link>
    </>
  );
};

import { View, Text } from 'react-native';
import React from 'react';
import { Chat } from '../Components/Chat';

export default function ChatScreen(navigation, route) {
  return <Chat navigation={navigation} route={route} />;
}

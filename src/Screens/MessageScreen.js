import { View, Text } from 'react-native'
import React from 'react'
import Message from '../Components/Message'

export function MessageScreen({navigation}) {
  return (
    <Message navigation={navigation}/>
  )
}
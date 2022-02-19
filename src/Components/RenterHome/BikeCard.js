import React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const BikeCard = ({ bike }) => {
  const { model, dailyPrice, type,img } = bike;
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('BikeScreen', {
          id: bike.id,
          owner: String(bike.ownerid),
        })
      }
    >
      <Card>
        <Card.Cover source={{ uri: img }} />
        <Card.Content>
          <Title>{model}</Title>
          <Paragraph>{`$${dailyPrice} - ${type} - 5'9''`}</Paragraph>
        </Card.Content>
      </Card>
    </TouchableWithoutFeedback>
  );
};

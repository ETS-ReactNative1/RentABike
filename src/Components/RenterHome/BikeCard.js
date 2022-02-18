import React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const BikeCard = ({ bike }) => {
  const { model, price, type } = bike;
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('BikeScreen', {
          id: bike.id,
          owner: String(bike.owner.id),
        })
      }
    >
      <Card>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Content>
          <Title>{model}</Title>
          <Paragraph>{`$${price.daily} - ${type} - 5'9''`}</Paragraph>
        </Card.Content>
      </Card>
    </TouchableWithoutFeedback>
  );
};

import React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

export const BikeCard = ({ bike }) => {
  const { model, dailyPrice, type, img } = bike;
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={() =>
        navigation.navigate('BikeScreen', {
          id: bike.id,
          owner: String(bike.ownerid),
        })
      }
    >
      <Card style={styles.card}>
        <Card.Cover source={{ uri: img }} />
        <Card.Content>
          <Title>{model}</Title>
          <Paragraph>{`$${dailyPrice} - ${type}'`}</Paragraph>
        </Card.Content>
      </Card>
    </TouchableWithoutFeedback>
  );
};

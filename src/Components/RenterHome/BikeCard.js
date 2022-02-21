import React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './styles';

export const BikeCard = ({ bike, userType }) => {
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
        {userType === 'owner' ? (
          <>
            <View style={styles.edit}>
              <Icon
                name='pencil'
                color='#465902'
                size={32}
                onPress={() =>
                  navigation.navigate('CreateBikeScreen', {
                    id: bike.id,
                    owner: String(bike.ownerid),
                  })
                }
              />
            </View>
            <View style={styles.delete}>
              <Icon
                name='trash'
                color='red'
                size={32}
                onPress={() =>
                  console.log('esto debe eliminar (primero un alert)')
                }
              />
            </View>
          </>
        ) : null}
        <Card.Content>
          <Title>{model}</Title>
          <Paragraph>{`$${dailyPrice} - ${type}`}</Paragraph>
        </Card.Content>
      </Card>
    </TouchableWithoutFeedback>
  );
};

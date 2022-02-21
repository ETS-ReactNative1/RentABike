import React from 'react';
import { doc, deleteDoc, getFirestore } from 'firebase/firestore';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Button,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './styles';

export const BikeCard = ({ bike, userType }) => {
  const db = getFirestore();
  const { model, dailyPrice, type, img } = bike;
  const navigation = useNavigation();
  const deleteHandler = async () => {
    Alert.alert('Are you sure?', 'This action cannot be reversed', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => await deleteDoc(doc(db, 'Bike', bike.id)),
      },
    ]);
  };
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
                onPress={deleteHandler}
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

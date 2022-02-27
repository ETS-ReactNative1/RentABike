import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Text } from 'react-native';
import { Card, Button, Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { useDispatch } from 'react-redux';
import { fetchBikeData, fetchUserBikeData } from '../../store/slices/bike';
import Loading from '../Loading';

export const TypeOfUser = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useLayoutEffect(() => {
    setLoading(true);
    const fetchBikes = dispatch(fetchBikeData());
    const fetchUserBikes = dispatch(fetchUserBikeData());
    setLoading(false);
    return () => {
      fetchBikes();
      fetchUserBikes();
    };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Loading loading={loading} />
      <Text style={styles.title}>Login as:</Text>
      <Card
        style={styles.card}
        onPress={() =>
          navigation.navigate('RentTabNavigation', {
            type: 'renter',
          })
        }
      >
        <Card.Cover
          style={styles.cardCover}
          source={{
            uri: 'https://images.pexels.com/photos/1005803/pexels-photo-1005803.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
          }}
        />
        <Card.Content style={styles.cardContent}>
          <Title style={styles.type}>Renter (I want a bike)</Title>
        </Card.Content>
      </Card>
      <Card
        style={styles.card}
        onPress={() =>
          navigation.navigate('RentTabNavigation', {
            type: 'owner',
          })
        }
      >
        <Card.Cover
          style={styles.cardCover}
          source={{
            uri: 'https://images.pexels.com/photos/221237/pexels-photo-221237.jpeg?auto=compress&cs=tinysrgb&h=640&w=895',
          }}
        />
        <Card.Content style={styles.cardContent}>
          <Title style={styles.type}>Owner (I have a bike)</Title>
        </Card.Content>
      </Card>
    </SafeAreaView>
  );
};

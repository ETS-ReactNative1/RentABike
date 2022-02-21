import { View, Text, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider, Button } from 'react-native-paper';

import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { styles } from './styles';

export function Bike(props) {
  const {
    navigation,
    route: { params },
  } = props;
  const db = getFirestore();
  const bikeRef = doc(db, 'Bike', params.id);
  const ownerRef = doc(db, 'User', params.owner);
  const [bike, setBike] = useState({});
  const [owner, setOwner] = useState({});
  const handleSubmit = () => {
    console.log('esto debería llevarte a un checkout');
  };
  useEffect(async () => {
    try {
      const bikeSnap = await getDoc(bikeRef);
      const bikeData = bikeSnap.data();
      const ownerSnap = await getDoc(ownerRef);
      const ownerData = ownerSnap.data();

      setBike({
        available: bikeData.available,
        year: bikeData.year,
        type: bikeData.type,
        description: bikeData.description || 'No description available.',
        height: bikeData.height || "6'9''",
        city: bikeData.city,
        dailyPrice: bikeData.dailyPrice,
        weeklyPrice: bikeData.weeklyPrice,
        img: bikeData.img,
        elbowPads: bikeData.elbowPads || 1,
        kneePads: bikeData.kneePads || 1,
        helmets: bikeData.helmets || 1,
        lock: bikeData.lock || true,
        model: bikeData.model,
      });
      setOwner(ownerData);
    } catch (error) {
      console.log('salió mal :', error);
    }
  }, []);
  return (
    <ScrollView>
      <SafeAreaView
        style={{
          minHeight: '100%',
          flex: 1,
          alignItems: 'center',
          marginHorizontal: 24,
          marginVertical: 24,
          paddingHorizontal: 16,
          paddingVertical: 16,
          backgroundColor: 'white',
        }}
      >
        <Image
          style={{ width: '100%', height: 300 }}
          source={{ uri: bike.img }}
        />
        <View
          style={{
            width: '100%',
            flex: 1,
            alignItems: 'flex-start',
            marginTop: 12,
          }}
        >
          <Text style={styles.item}>Model: {bike.model}</Text>
          <Text style={styles.item}>Type: {bike.type}</Text>

          <Text style={styles.item}>Height: {bike.height}</Text>
          <Text style={styles.item}>Year: {bike.year}</Text>

          <Text style={styles.item}>Owner: {owner.name}</Text>

          {owner.description ? (
            <Text style={styles.item}>
              Owner Description: {owner.description}
            </Text>
          ) : null}
          <Divider />
          <Text style={styles.item}>Description: {bike.description}</Text>
          <Divider />
          {(bike.helmets > 0 ||
            bike.elbowPads > 0 ||
            bike.kneePads > 0 ||
            bike.lock) && <Text style={styles.item}>Includes:</Text>}
          {(bike.helmets > 0 || bike.elbowPads > 0) && (
            <View
              style={{ width: '100%', display: 'flex', flexDirection: 'row' }}
            >
              {bike.helmets > 0 && (
                <Text style={styles.itemFlex}>Helmets: {bike.helmets}</Text>
              )}
              {bike.elbowPads > 0 && (
                <Text style={styles.itemFlex}>
                  Elbow pads: {bike.elbowPads}
                </Text>
              )}
            </View>
          )}
          {(bike.kneePads > 0 || bike.lock) && (
            <View
              style={{ width: '100%', display: 'flex', flexDirection: 'row' }}
            >
              {bike.kneePads > 0 && (
                <Text style={styles.itemFlex}>Knee pads: {bike.kneePads}</Text>
              )}
              {bike.lock && <Text style={styles.itemFlex}>Lock :D</Text>}
            </View>
          )}
        </View>
        <Divider />
        <View
          style={{
            width: '100%',
            flex: 1,
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: '100%',
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                width: '50%',
                height: 40,
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={styles.itemCheckout}
              >{`$${bike.dailyPrice}/ day`}</Text>
              <Text
                style={styles.itemCheckout}
              >{`$${bike.weeklyPrice}/ week`}</Text>
            </View>
            <View
              style={{
                width: '50%',
                height: 80,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                mode='contained'
                color='#7C8C03'
                style={styles.submitButton}
                onPress={handleSubmit}
              >
                Reserve
              </Button>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

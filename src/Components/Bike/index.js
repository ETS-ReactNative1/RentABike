import { View, Text, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, List } from 'react-native-paper';

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
import Loading from '../Loading';
import { styles } from './styles';
import { colors } from '../../colors';

export function Bike(props) {
  const {
    navigation,
    route: { params },
  } = props;
  const db = getFirestore();
  const [loading, setLoading] = useState(false);
  const bikeRef = doc(db, 'Bike', params.id);
  const ownerRef = doc(db, 'User', params.owner);
  const [bike, setBike] = useState({});
  const [owner, setOwner] = useState({});
  const handleSubmit = () => {
    navigation.navigate('ReserveScreen', {
      owner: owner.uid,
      bike: params.id,
    });
  };
  useEffect(async () => {
    try {
      setLoading(true);
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
      setLoading(false);
    } catch (error) {
      console.log('salió mal :', error);
      setLoading(false);
    }
  }, []);
  return (
    <>
      <Loading loading={loading} />
      <ScrollView
        style={{
          paddingBottom: 10,
          backgroundColor: colors.background,
        }}
      >
        {!loading && (
          <SafeAreaView
            style={{
              minHeight: '90%',
              flex: 1,
              alignItems: 'center',
              marginHorizontal: 24,
              marginVertical: 24,
              paddingHorizontal: 16,
              paddingVertical: 16,
              backgroundColor: 'white',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <Image
              style={{ width: '100%', height: 300 }}
              source={{ uri: bike.img }}
            />
            <View
              style={{
                width: '100%',
                minHeight: 200,
                display: 'flex',
                alignItems: 'flex-start',
                marginTop: 12,
              }}
            >
              <View style={styles.item}>
                <Text style={styles.label}>Model:</Text>
                <Text style={styles.info}>{bike.model}</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.label}>Type:</Text>
                <Text style={styles.info}>{bike.type}</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.label}>Height:</Text>
                <Text style={styles.info}>{bike.height}</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.label}>Year:</Text>
                <Text style={styles.info}>{bike.year}</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.label}>Owner:</Text>
                <Text style={styles.info}>{owner.name}</Text>
              </View>
              {owner.description ? (
                <View style={styles.item}>
                  <Text style={styles.label}>Owner Description:</Text>
                  <Text style={styles.info}>{owner.description}</Text>
                </View>
              ) : null}
              <View style={styles.item}>
                <Text style={styles.label}>Description:</Text>
                <Text style={styles.info}>{bike.description}</Text>
              </View>
            </View>
            {(bike.helmets > 0 ||
              bike.elbowPads > 0 ||
              bike.kneePads > 0 ||
              bike.lock) && (
              <List.Section style={{ width: '100%' }}>
                <List.Accordion
                  title='Includes:'
                  titleStyle={{ color: colors.primary, fontWeight: 'bold' }}
                  left={(props) => (
                    <List.Icon {...props} icon='bike' color={colors.primary} />
                  )}
                >
                  <List.Item
                    title={
                      bike.helmets > 0 && (
                        <Text style={styles.itemFlex}>
                          • Helmets: {bike.helmets}
                        </Text>
                      )
                    }
                  />
                  <List.Item
                    title={
                      bike.elbowPads > 0 && (
                        <Text style={styles.itemFlex}>
                          • Elbow Pads: {bike.elbowPads}
                        </Text>
                      )
                    }
                  />
                  <List.Item
                    title={
                      bike.kneePads > 0 && (
                        <Text style={styles.itemFlex}>
                          • Knee Pads: {bike.kneePads}
                        </Text>
                      )
                    }
                  />
                  <List.Item
                    title={
                      bike.lock && (
                        <Text style={styles.itemFlex}>• Lock: yeah!</Text>
                      )
                    }
                  />
                </List.Accordion>
              </List.Section>
            )}
            <View
              style={{
                width: '100%',
                display: 'flex',
                alignContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  width: '100%',
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 4,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={styles.itemCheckoutLabel}>
                    <Text style={styles.itemCheckout}>Take a ride for </Text>
                    {`$${bike.dailyPrice}`}{' '}
                    <Text style={styles.itemCheckout}>{`Daily`}</Text>
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                ></View>
                <Button
                  mode='contained'
                  color={colors.primary}
                  style={styles.submitButton}
                  onPress={handleSubmit}
                >
                  Reserve now!
                </Button>
              </View>
            </View>
          </SafeAreaView>
        )}
      </ScrollView>
    </>
  );
}

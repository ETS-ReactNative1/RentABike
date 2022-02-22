import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import { styles } from './styles';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from 'firebase/firestore';
import { firebaseConfig } from '../../../config/database/firebase';
import { BikeCard } from '../RenterHome/BikeCard';
import Loading from '../Loading';
import { HistoryCard } from '../HistoryCard';

const app = initializeApp(firebaseConfig);

export function History(props) {
  const {
    navigation,
    route: { params },
  } = props;
  const [loading, setLoading] = useState(false);
  const db = getFirestore();
  const rentRef = collection(db, 'Rent');
  const q = query(rentRef, where('userId', '==', params.userId));
  const [rentData, setRentData] = useState([]);

  useEffect(async () => {
    setLoading(true);
    await getDocs(q).then((querySnapshot) => {
      const item = [];
      querySnapshot.forEach(async (rent) => {
        try {
          const bikeRef = doc(db, 'Bike', rent.data().bikeId);
          const bikeSnap = await getDoc(bikeRef);
          const bikeData = await bikeSnap.data();
          const ownerRef = doc(db, 'User', rent.data().ownerId);
          const ownerSnap = await getDoc(ownerRef);
          const ownerData = await ownerSnap.data();
          item.push({
            rent: { id: rent.id, ...rent.data() },
            bike: {
              city: bikeData.city,
              img: bikeData.img,
              model: bikeData.model,
            },
            owner: { name: ownerData.name },
          });
          setRentData(item);
        } catch (error) {
          console.log('salió mal:C');
          console.log(error);
          setLoading(false);
        }
      });
    });
    setLoading(false);
  }, []);
  console.log('mi data bella :', rentData);
  return (
    <>
      <Loading loading={loading} />
      {!loading && (
        <SafeAreaView>
          <FlatList
            data={rentData}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            keyExtractor={(e) => String(e.rent.id)}
            renderItem={({ item }) => <HistoryCard data={item} />}
            contentContainerStyle={styles.flatListContainer}
          />
        </SafeAreaView>
      )}
    </>
  );
}

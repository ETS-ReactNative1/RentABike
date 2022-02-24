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
  const bikeRef = collection(db, 'Bike');
  const ownerRef = collection(db, 'User');
  const q = query(rentRef, where('userId', '==', params.userId));
  const [rentArray, setRentArray] = useState([]);
  const [bikeArray, setBikeArray] = useState([]);
  const [ownerArray, setOwnerArray] = useState([]);

  const historyData = rentArray.map((re) => {
    const ownerArr = ownerArray.find((own) => own.ownerId === re.ownerId);
    const bikeArr = bikeArray.find((bik) => bik.bikeId === re.bikeId);
    return { rent: { ...re }, owner: { ...ownerArr }, bike: { ...bikeArr } };
  });

  useEffect(async () => {
    setLoading(true);
    //Info de las rentas
    await onSnapshot(q, (querySnapshot) => {
      setRentArray(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })),
      );
    });
    //

    //array de bikeIds  // falta limitar a 10
    const bikeIds = [];
    const bikeSnap = await getDocs(q);
    bikeSnap.forEach((element) => {
      bikeIds.push(element.data().bikeId);
    });
    //
    // documentos de bike
    const bikeData = [];
    const bikeDocs = await getDocs(
      query(bikeRef, where(documentId(), 'in', bikeIds)),
    );
    bikeDocs.forEach((e) => {
      bikeData.push({
        bikeId: e.id,
        img: e.data().img,
        model: e.data().model,
        dailyPrice: e.data().dailyPrice,
        city: e.data().city,
        ownerid: e.data().ownerid,
      });
    });
    setBikeArray(bikeData);
    //array de ownerIds  // falta limitar a 10
    const ownerIds = [];
    const ownerSnap = await getDocs(q);
    ownerSnap.forEach((element) => {
      ownerIds.push(element.data().ownerId);
    });
    //
    // documentos de owner
    const ownerData = [];
    const ownerDocs = await getDocs(
      query(ownerRef, where(documentId(), 'in', ownerIds)),
    );
    ownerDocs.forEach((e) => {
      ownerData.push({
        ownweId: e.id,
        email: e.data().email,
        name: e.data().name,
        phoneNumber: e.data().phoneNumber,
      });
    });
    setOwnerArray(ownerData);
    setLoading(false);
  }, []);
  return (
    <>
      <Loading loading={loading} />
      {!loading && (
        <SafeAreaView>
          {
            <FlatList
              data={historyData}
              numColumns={1}
              showsVerticalScrollIndicator={false}
              keyExtractor={(e) => String(e.rent.id)}
              renderItem={({ item }) => <HistoryCard data={item} />}
              contentContainerStyle={styles.flatListContainer}
            />
          }
          <Text>Hola</Text>
        </SafeAreaView>
      )}
    </>
  );
}

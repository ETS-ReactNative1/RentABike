import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { List } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  FlatList,
} from 'react-native';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { firebaseConfig } from '../../../config/database/firebase';
import { BikeCard } from './BikeCard';
import Loading from '../Loading';
import { colors } from '../../colors';

export const RenterHome = () => {
  const [loading, setLoading] = useState(false);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore();
  const usersRef = collection(db, 'Bike');
  const q = query(usersRef /* , where('email', '==', 'Juankto@gmail.com') */);
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    setLoading(true);
    const item = [];
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        /* const { name, phone, email } = doc.data(); */
        item.push({ id: doc.id, ...doc.data() });
        /*    item.push({ id: doc.id, name, phone, email }); */
      });
      setBikes(item);
      setLoading(false);
    });
  }, []);
  return (
    <>
      <Loading loading={loading} />
      <SafeAreaView style={{backgroundColor:colors.background}}>
        <FlatList
          data={bikes}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          keyExtractor={(e) => String(e.id)}
          renderItem={({ item }) => (
            <BikeCard bike={item} userType={'renter'} />
          )}
          contentContainerStyle={styles.flatListContainer}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: 5,
  },
});

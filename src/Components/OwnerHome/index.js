import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { List } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
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
import { BikeCard } from '../RenterHome/BikeCard';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const OwnerHome = () => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore();
  const usersRef = collection(db, 'Bike');
  const q = query(usersRef, where('ownerid', '==', auth.currentUser.uid));
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    const item = [];
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        item.push({ id: doc.id, ...doc.data() });
      });

      setBikes(item);
    });
  }, []);

  return (
    <>
      <SafeAreaView>
        <Text>Esto es un Home</Text>
        <FlatList
          data={bikes}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          keyExtractor={(e) => String(e.id)}
          renderItem={({ item }) => <BikeCard bike={item} />}
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

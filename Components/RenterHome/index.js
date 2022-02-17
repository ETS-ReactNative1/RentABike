import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { List } from 'react-native-paper';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
} from 'react-native';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { firebaseConfig } from '../../config/database/firebase';

export const RenterHome = () => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore();
  const usersRef = collection(db, 'Bike');
  const q = query(usersRef /* , where('email', '==', 'Juankto@gmail.com') */);
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    const item = [];
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        /* const { name, phone, email } = doc.data(); */
        item.push({ id: doc.id, ...doc.data() });
        /*    item.push({ id: doc.id, name, phone, email }); */
      });
      setBikes(item);
    });
  }, []);
  console.log(bikes);
  return (
    <View>
      <Text>Esto es un Home</Text>
      {bikes &&
        bikes.map((e) => (
          <List.Item
            key={e.id}
            title={e.model}
            description={e.type}
            left={(props) => <List.Icon {...props} icon='folder' />}
          />
        ))}
    </View>
  );
};

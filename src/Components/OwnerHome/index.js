import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Button, FAB } from 'react-native-paper';
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
  query,
  where,
} from 'firebase/firestore';
import { firebaseConfig } from '../../../config/database/firebase';
import { BikeCard } from '../RenterHome/BikeCard';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const OwnerHome = () => {
  const navigation = useNavigation();
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
    <SafeAreaView>
      <FlatList
        data={bikes}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        keyExtractor={(e) => String(e.id)}
        renderItem={({ item }) => <BikeCard bike={item} userType={'owner'} />}
        contentContainerStyle={styles.flatListContainer}
      />
      <FAB
        style={styles.fab}
        icon='plus'
        onPress={() => navigation.navigate('CreateBikeScreen')}
      />
    </SafeAreaView>
  );
};

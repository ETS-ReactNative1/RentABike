import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Button, FAB } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserBikeData } from '../../store/slices/bike';
import { styles } from './styles';
import { fetchRentData, fetchRentOwnerData } from '../../store/slices/rent';
import { fetchUserData } from '../../store/slices/user';
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
import Loading from '../Loading';
import { colors } from '../../colors';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const OwnerHome = () => {
  const { userBikeData: dataPrueba } = useSelector((state) => state.bike);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const db = getFirestore();
  const usersRef = collection(db, 'Bike');
  const q = query(usersRef, where('ownerid', '==', auth.currentUser.uid));
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchRent = dispatch(fetchRentData());
    const fetchRentOwner = dispatch(fetchRentOwnerData());
    const fetchUser = dispatch(fetchUserData());
    const fetchUserBikes = dispatch(fetchUserBikeData());

    setLoading(false);
    setBikes(dataPrueba);

    return () => {
      fetchRent();
      fetchRentOwner();
      fetchUser();
      fetchUserBikes();
    };
  }, []);

  return (
    <>
      <Loading loading={loading} />
      <SafeAreaView
        style={{ backgroundColor: colors.background, minHeight: '100%' }}
      >
        <FlatList
          data={dataPrueba}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          keyExtractor={(e) => String(e.bikeId)}
          renderItem={({ item }) => <BikeCard bike={item} userType={'owner'} />}
          contentContainerStyle={styles.flatListContainer}
        />
        <FAB
          style={styles.fab}
          icon='plus'
          onPress={() => navigation.navigate('CreateBikeScreen')}
        />
      </SafeAreaView>
    </>
  );
};

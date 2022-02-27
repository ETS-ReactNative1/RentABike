import { View, Text, FlatList } from 'react-native';
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from 'react';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  orderBy,
  query,
  where,
  onSnapshot,
  getFirestore,
  documentId,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import Chat from '../Chat';
import { Button } from 'react-native-paper';
import { firebaseConfig } from '../../../config/database/firebase';
import { MessageCard } from './MessageCard';
import { colors } from '../../colors';
import { useSelector, useDispatch } from 'react-redux';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export const Message = ({ navigation }) => {
  const { rentData: dataPrueba } = useSelector((state) => state.rent);
  const [loading, setLoading] = useState(false);
  const rentRef = collection(db, 'Rent');
  const bikeRef = collection(db, 'Bike');
  const ownerRef = collection(db, 'User');
  const q = query(rentRef, where('userId', '==', auth.currentUser.uid));
  const [bikeArray, setBikeArray] = useState([]);
  const [ownerArray, setOwnerArray] = useState([]);

 
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    setLoading(true);
    setHistoryData(dataPrueba);
    setLoading(false);
  }, []);
  console.log(historyData);
  return (
    <>
      {!loading && (
        <SafeAreaView
          style={{ backgroundColor: colors.background, paddingHorizontal: 8 }}
        >
          {historyData.length > 0 ? (
            <FlatList
              style={{ margin: 0 }}
              data={historyData}
              numColumns={1}
              showsVerticalScrollIndicator={false}
              keyExtractor={(e) => String(e.rentId)}
              renderItem={({ item }) => <MessageCard item={item} />}
              contentContainerStyle={{ paddingHorizontal: 5 }}
            />
          ) : (
            <Text>Looks like you don't have any messages yet!</Text>
          )}
        </SafeAreaView>
      )}
    </>
  );
};

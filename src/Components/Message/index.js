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
import { useSelector } from 'react-redux';

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

  const historyData = dataPrueba.map((re) => {
    const ownerArr = ownerArray.find((own) => own.ownerId === re.ownerId);
    const bikeArr = bikeArray.find((bik) => bik.bikeId === re.bikeId);
    /* console.log({
      rent: { ...re },
      owner: { ...ownerArr },
      bike: { ...bikeArr },
    }); */
    return { rent: { ...re }, owner: { ...ownerArr }, bike: { ...bikeArr } };
  });

  useEffect(() => {
    setLoading(true);
    (async function () {
      //Info de las rentas
      // onSnapshot(q, (querySnapshot) => {
      //   setRentArray(
      //     querySnapshot.docs.map((doc) => ({
      //       ...doc.data(),
      //       id: doc.id,
      //     })),
      //   );
      // });
      //
      /* setRentArray(dataPrueba); */
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
          ownerId: e.id,
          email: e.data().email,
          name: e.data().name,
          phoneNumber: e.data().phoneNumber,
        });
      });
      setOwnerArray(ownerData);
    })();
    setLoading(false);
  }, []);
  console.log(historyData);
  return (
    <>
      {!loading && (
        <SafeAreaView
          style={{ backgroundColor: colors.background, paddingHorizontal: 8 }}
        >
          <FlatList
            style={{ margin: 0 }}
            data={historyData}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            keyExtractor={(e) => String(e.rent.id)}
            renderItem={({ item }) => <MessageCard item={item} />}
            contentContainerStyle={{ paddingHorizontal: 5 }}
          />
        </SafeAreaView>
      )}
    </>
  );
};

// querySnapshot.docs
//           .map((doc) => ({
//             _id: doc.id,
//             ownerId: doc.data().ownerId,
//             bikeId: doc.data().bikeId,
//             userId: doc.data().userId,
//             pickUp: doc.data().pickUp,
//             days: doc.data().days,
//             amount: doc.data().amount,
//           }))

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
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import Chat from '../Chat';
import { Button } from 'react-native-paper';
import { firebaseConfig } from '../../../config/database/firebase';
import { MessageCard } from './MessageCard';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export const Message = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [myData, setMyData] = useState([]);

  useLayoutEffect(() => {
    setLoading(true);
    const collectionRef = collection(db, 'Rent');
    const q = query(
      collectionRef,
      where('userId', '==', auth?.currentUser.uid),
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newData = [];
      querySnapshot.docs.forEach(async (rent) => {
        try {
          const rentInfo = {
            _id: rent.id,
            ownerId: rent.data().ownerId,
            bikeId: rent.data().bikeId,
            userId: rent.data().userId,
            pickUp: rent.data().pickUp,
            days: rent.data().days,
            amount: rent.data().amount,
          };
          const bikeRef = doc(db, 'Bike', rentInfo.bikeId);
          const bikeSnap = await getDoc(bikeRef);
          const bikeData = bikeSnap.data();
          const ownerRef = doc(db, 'User', rentInfo.ownerId);
          const ownerSnap = await getDoc(ownerRef);
          const ownerData = ownerSnap.data();
          const bikeInfo = { img: bikeData.img, model: bikeData.model };
          const ownerInfo = { name: ownerData.name, img: ownerData.img };
          newData.push({
            rent: { ...rentInfo },
            bike: { ...bikeInfo },
            owner: { ...ownerInfo },
          });
          
        } catch (error) {
          console.log('algo salió mal');
          console.log(error);
          setLoading(false);
        }
      });
      setMyData(newData);

    });
    /*  console.log('data desde dentro :', myData); */
    return unsubscribe;
  }, []);

  console.log('data desde afueraxd :', myData);
  return (
    <>
      {!loading && (
        <SafeAreaView>
          <Text>hola</Text>
          <FlatList
            data={myData}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            keyExtractor={(e) => String(e.rent._id)}
            renderItem={({ item }) => (
              <MessageCard
                onPress={() =>
                  navigation.navigate('ChatScreen', {
                    // agregar item.rentId, item.ownerName,etc
                    rentId: item.rentId,
                    ownerName: 'unknow',
                    bikeModel: 'BMX 5780',
                  })
                }
              />
            )}
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

import { firebaseConfig } from '../../config/database/firebase';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getFirestore,
  onSnapshot,
  query,
  where,
  updateDoc,
} from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

const token = 'holi';

export const setDeviceToken = async (userId) => {
  try {
    const userRef = collection(db, 'User');
    const q = query(userRef, where('deviceToken', '==', token));
    onSnapshot(q, async (querySnapshot) => {
      const tokenUser = await querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      await tokenUser.forEach(async (e) => {
        if (e.id !== userId) {
          await updateDoc(doc(db, 'User', e.id), {
            deviceToken: '',
          });
          await updateDoc(doc(db, 'User', userId), {
            deviceToken: token,
          });
        }
      });
      console.log('token actualizado!');
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

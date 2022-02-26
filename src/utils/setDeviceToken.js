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
  getDocs,
} from 'firebase/firestore';
import { registerForPushNotifications } from './registerForPushNotifications';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export const setDeviceToken = async (userId) => {
  try {
    const token = await registerForPushNotifications();
    await updateDoc(doc(db, 'User', userId), {
      deviceToken: token,
    });
    const userRef = collection(db, 'User');
    const q = query(userRef, where('deviceToken', '==', token));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (user) => {
      if (user.id !== userId) {
        console.log('user.id :', user.id);
        await updateDoc(doc(db, 'User', user.id), {
          deviceToken: '',
        });
      }
    });
    console.log('token actualizado!');
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

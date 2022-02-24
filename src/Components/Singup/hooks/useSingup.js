import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { firebaseConfig } from '../../../../config/database/firebase';
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
} from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export const useSingup = async (
  email,
  password,
  phoneNumber,
  displayName,
  navigation,
  setLoading,
) => {
  setLoading(true);
  await createUserWithEmailAndPassword(auth, email, password)
    .then((result) => {
      const user = result.user;
      console.log('usuario registrado', user);
      console.log(displayName, phoneNumber);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  await updateProfile(auth.currentUser, {
    displayName: displayName,
  }).catch((error) => {
    console.log(error);
  });
  await onAuthStateChanged(auth, async (user) => {
    if (user) {
      const uid = user.uid;
      try {
        await setDoc(doc(db, 'User', uid), {
          name: displayName,
          email,
          phoneNumber,
          img: 'https://firebasestorage.googleapis.com/v0/b/rent-abike.appspot.com/o/cd579617-31a7-42f8-b3b7-4ff46463ae0f?alt=media&token=572d7dbc-2cd6-4999-8ced-b4f32b44029d',
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        Alert.alert('Upps', error);
        console.error('Error adding document: ', error);
      }
      console.log('sesión iniciado :', uid);
      navigation.navigate('TypeOfUserScreen');
    } else {
      return;
    }
  });
};

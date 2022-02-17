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
) => {
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
        });
      } catch (e) {
        console.error('Error adding document: ', e);
      }
      console.log('sesión iniciado :', uid);
      navigation.navigate('TypeOfUserScreen');
    } else {
    }
  });
};

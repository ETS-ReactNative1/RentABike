import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { firebaseConfig } from '../../../config/database/firebase';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const useSingup = async (email, password, phoneNumber, displayName, navigateHome) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((result) => {
      //Add name
      const user = result.user;
      console.log('usuario registrado', user);
      console.log(displayName, phoneNumber);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      // ..
    });
  /*  const user = await auth.currentUser; */
  await updateProfile(auth.currentUser, {
    displayName: displayName,
  }).catch((error) => {
    console.log(error);
  });
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log('sesión iniciado :', uid);
      navigateHome();
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
};

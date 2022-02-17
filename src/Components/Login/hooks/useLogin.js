import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../../../../config/database/firebase';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const useLogin = (email, password, navigation) =>
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log('Usuario logeado', user);
      navigation.navigate('TypeOfUserScreen');
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });

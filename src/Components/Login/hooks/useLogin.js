import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Alert } from 'react-native';
import { firebaseConfig } from '../../../../config/database/firebase';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const useLogin = async (email, password, navigation, setLoading) => {
  setLoading(true);
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      setLoading(false);
      navigation.replace('TypeOfUserScreen');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      setLoading(false);
      Alert.alert('Upps', errorMessage.split(':')[1]);
    });
};

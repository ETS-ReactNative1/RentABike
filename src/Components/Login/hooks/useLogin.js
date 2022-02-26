import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Alert } from 'react-native';
import { firebaseConfig } from '../../../../config/database/firebase';
import { setDeviceToken } from '../../../utils/setDeviceToken';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const useLogin = async (email, password, navigation, setLoading) => {
  try {
    setLoading(true);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    console.log(user.uid);
    await setDeviceToken(user.uid);
    setLoading(false);
    navigation.replace('OnboardingScreen');
    /* navigation.replace('TypeOfUserScreen'); */
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    setLoading(false);
    Alert.alert('Upps', errorMessage.split(':')[1]);
  }
};

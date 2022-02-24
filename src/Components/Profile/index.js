import { View, Text, Image, ScrollView, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'uuid';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { styles } from './styles';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { firebaseConfig } from '../../../config/database/firebase';
import { useNavigation } from '@react-navigation/native';
import Loading from '../Loading';
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
} from 'firebase/firestore';
import { colors } from '../../colors';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
export default function Profile() {
  const navigation = useNavigation();
  const [updatingPhoto, setUpdatingPhoto] = useState(false);
  const storage = getStorage();
  const imgRef = ref(storage, uuid.v4());
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState(
    'https://images.pexels.com/photos/987571/pexels-photo-987571.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  );
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    setLoading(true);
    if (Platform.OS !== 'web') {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission denied!');
      }
    }
    await onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        try {
          const userRef = doc(db, 'User', uid);
          const userSnap = await getDoc(userRef);
          const userData = userSnap.data();
          setData({ ...userData, uid });
          setImage(userData.img);
          setLoading(false);
        } catch (e) {
          console.error('Error adding document: ', e);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });
  }, []);
  async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
    await uploadBytes(imgRef, blob);
    console.log('Uploaded');
    return await getDownloadURL(imgRef);
  }
  const pickImage = async () => {
    try {
      setUpdatingPhoto(true);
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log('result :', result);
      if (!result.cancelled) {
        setImage(result.uri);
        const uploadUrl = await uploadImageAsync(result.uri);
        setImageUrl(uploadUrl);
        setUpdatingPhoto(false);
      }
    } catch (error) {
      Alert.alert('Something went wrong', 'Try again later');
    }
  };
  const handleSubmit = async (values) => {
    await setDoc(doc(db, 'User', data.uid), { ...values, img: imageUrl });
    console.log('enviar datos a firestore');
  };
  const changePasswordHandler = async () => {
    try {
      Alert.alert(
        'Are you sure?',
        'We will send you an email to validate your identity',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              try {
                await sendPasswordResetEmail(auth, data.email);
                Alert.alert(
                  'Email sended',
                  'Check your email to change your password',
                  [
                    {
                      text: 'Ok',
                      onPress: () => navigation.navigate('LoginScreen'),
                    },
                  ],
                );
              } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert('Upps', error);
                console.log(errorCode, errorMessage);
              }
            },
          },
        ],
      );
    } catch (error) {
      console.log(error);
    }
  };
  const deleteAccountHandler = async () => {
    try {
      Alert.alert(
        'Are you sure?',
        'We will send you an email to validate your identity',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => await console.log('Enviar correoxd'),
          },
        ],
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Loading loading={loading} />
      <ScrollView style={styles.scrollContainer}>
        <SafeAreaView style={styles.container}>
          {!loading && (
            <Formik initialValues={data} onSubmit={handleSubmit}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isValid,
              }) => (
                <>
                  {image ? (
                    <View style={styles.imageContainer}>
                      <Image source={{ uri: image }} style={styles.image} />
                    </View>
                  ) : (
                    <View style={styles.imageContainer}>
                      <Icon
                        name='user'
                        color='grey'
                        style={styles.image}
                        size={72}
                      />
                    </View>
                  )}
                  <Button
                    onPress={pickImage}
                    color={colors.primary}
                    loading={updatingPhoto}
                    style={{ fontSize: 16, fontWeight: 'bold' }}
                  >
                    Upload a Photo
                  </Button>
                  <Text style={styles.label}>User name</Text>
                  <Text style={styles.info}>{data.name}</Text>
                  <Text style={styles.label}>Description</Text>
                  <TextInput
                    mode='flat'
                    activeUnderlineColor={colors.primary}
                    style={{ ...styles.info, width: '100%', marginBottom: 8 }}
                    name='description'
                    placeholder='Your description'
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                    value={values.description}
                  />
                  <Text style={styles.label}>Email</Text>
                  <Text style={styles.info}>{data.email}</Text>
                  <Text style={styles.label}>Phone Number</Text>
                  <Text style={{ ...styles.info, marginBottom: 8 }}>
                    {data.phoneNumber}
                  </Text>
                  <Button
                    onPress={handleSubmit}
                    disabled={updatingPhoto}
                    mode='contained'
                    color={colors.backgroundDarker}
                    style={styles.submitButton}
                  >
                    Update profile
                  </Button>
                  <Button
                    onPress={() =>
                      navigation.navigate('HistoryScreen', {
                        userId: data.uid,
                      })
                    }
                    mode='contained'
                    color={colors.primary}
                    style={styles.submitButton}
                  >
                    History
                  </Button>
                  <Button
                    onPress={changePasswordHandler}
                    color={colors.important}
                    style={styles.textButton}
                  >
                    Change your password
                  </Button>
                  <Button
                    onPress={deleteAccountHandler}
                    color={colors.important}
                    style={styles.textButton}
                  >
                    Delete Account
                  </Button>
                </>
              )}
            </Formik>
          )}
        </SafeAreaView>
      </ScrollView>
    </>
  );
}

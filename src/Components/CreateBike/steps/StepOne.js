import React from 'react';
import { useState, useEffect } from 'react';
import { useValidateOne } from '../hooks/useValidateOne';
import { View, Text, TextInput, Button, Platform, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { styles } from '../../Login/styles';
import uuid from 'uuid';

export function StepOne(props) {
  const storage = getStorage();
  const imgRef = ref(storage, uuid.v4());
  const [image, setImage] = useState('');
  const [imgUri, setimgUri] = useState('');

  useEffect(async () => {
    if (Platform.OS !== 'web') {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission denied!');
      }
    }
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
      console.log(uploadUrl);
      setimgUri(uploadUrl);
    }
  };

  const bikeValidationSchema = useValidateOne();
  const handleSubmit = (values) => {
    props.next({ ...values, img: imgUri });
    console.log({ ...values, img: imgUri });
  };
  return (
    <View style={styles.loginContainer}>
      <Formik
        validationSchema={bikeValidationSchema}
        initialValues={props.data}
        onSubmit={handleSubmit}
      >
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
            <TextInput
              name='model'
              placeholder='Montra Helicon Disc'
              style={styles.textInput}
              onChangeText={handleChange('model')}
              onBlur={handleBlur('model')}
              value={values.model}
            />
            {errors.model && touched.model && (
              <Text style={styles.errorText}>{errors.model}</Text>
            )}
            <TextInput
              name='type'
              placeholder='Muntain'
              style={styles.textInput}
              onChangeText={handleChange('type')}
              onBlur={handleBlur('type')}
              value={values.type}
            />
            {errors.type && touched.type && (
              <Text style={styles.errorText}>{errors.type}</Text>
            )}
            <Button onPress={pickImage} title='Upload Photo' />
            {image ? (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            ) : null}
            <Button
              onPress={handleSubmit}
              title='Submit'
              disabled={(!isValid, !Boolean(image) === true)}
            />
          </>
        )}
      </Formik>
    </View>
  );
}

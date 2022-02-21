import React, { useState, useEffect } from 'react';
import { useValidateOne } from '../hooks/useValidateOne';
import { HelperText, Button, TextInput } from 'react-native-paper';
import { View, Text, Platform, Image, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { styles } from '../../Login/styles';
import uuid from 'uuid';
import { stylesForm } from './stylesForm';

export function StepOne(props) {
  const [updatingPhoto, setUpdatingPhoto] = useState(false);
  const storage = getStorage();
  const imgRef = ref(storage, uuid.v4());
  const [image, setImage] = useState(props.data.img);
  const [imgUri, setimgUri] = useState(props.data.img);

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
        setimgUri(uploadUrl);
        setUpdatingPhoto(false);
      }
    } catch (error) {
      Alert.alert('Something went wrong', 'Try again later');
    }
  };

  const bikeValidationSchema = useValidateOne();
  const handleSubmit = (values) => {
    props.next({ ...values, img: imgUri });
    console.log({ ...values, img: imgUri });
  };
  return (
    <View style={stylesForm.container}>
      <View style={stylesForm.loginContainer}>
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
              <Text style={stylesForm.title}>Time to Rent your Bike</Text>
              <Text style={stylesForm.label}>What is your bike model?</Text>
              <TextInput
                activeUnderlineColor='#7C8C03'
                name='model'
                placeholder='Montra Helicon Disc'
                style={stylesForm.textInput}
                onChangeText={handleChange('model')}
                onBlur={handleBlur('model')}
                value={values.model}
              />
              {errors.model && touched.model && (
                <Text style={styles.errorText}>{errors.model}</Text>
              )}
              <Text style={stylesForm.label}>What kind of bike is it?</Text>
              <TextInput
                activeUnderlineColor='#7C8C03'
                name='type'
                placeholder='Muntain'
                style={stylesForm.textInput}
                onChangeText={handleChange('type')}
                onBlur={handleBlur('type')}
                value={values.type}
              />
              {errors.type && touched.type && (
                <Text style={styles.errorText}>{errors.type}</Text>
              )}
              {image ? (
                <View style={stylesForm.imageContainer}>
                  <Image source={{ uri: image }} style={stylesForm.image} />
                </View>
              ) : null}
              <Button
                onPress={pickImage}
                mode='contained'
                color='#B9BF04'
                loading={updatingPhoto}
              >
                Upload a Photo
              </Button>
              <Button
                onPress={handleSubmit}
                disabled={(!isValid, !updatingPhoto, !props.data.img)}
                mode='contained'
                color='#7C8C03'
                style={styles.submitButton}
              >
                Siguiente
              </Button>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
}

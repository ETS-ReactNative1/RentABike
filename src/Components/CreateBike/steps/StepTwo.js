import React from 'react';
import { useValidateTwo } from '../hooks/useValidateTwo';
import { HelperText, Button, TextInput } from 'react-native-paper';
import { View, Text } from 'react-native';
import { styles } from '../../Login/styles';
import { Picker } from 'react-native-picker-picker-fix';
import { Formik } from 'formik';
import { useState } from 'react';
import { stylesForm } from './stylesForm';

export function StepTwo(props) {
  const [city, setCity] = useState('Trujillo');
  const [includes, setIncludes] = useState({
    helmet: 0,
    elbowPads: 0,
    kneePads: 0,
    lock: false,
  });
  const bikeValidationSchema = useValidateTwo();
  const handleSubmit = (values) => {
    props.next({ ...values, city });
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
              <Text style={stylesForm.label}>What year is your bike?</Text>
              <TextInput
                activeUnderlineColor='#7C8C03'
                name='year'
                placeholder='2018'
                style={stylesForm.textInput}
                onChangeText={handleChange('year')}
                onBlur={handleBlur('year')}
                value={values.year}
                keyboardType='number-pad'
              />
              {errors.year && touched.year && (
                <Text style={styles.errorText}>{errors.year}</Text>
              )}
              <Text style={stylesForm.label}>
                Where do you want to rent it?
              </Text>
              <Picker
                style={stylesForm.picker}
                name='city'
                id='city'
                onBlur={handleBlur('city')}
                selectedValue={city}
                onValueChange={(itemValue, itemIndex) => {
                  setCity(itemValue);
                  handleChange('city');
                }}
              >
                <Picker.Item label='Trujillo' value='Trujillo' />
                <Picker.Item label='Arequipa' value='Arequipa' />
                <Picker.Item label='Lima' value='Lima' />
              </Picker>
              <Text style={stylesForm.label}>How much for a day?</Text>
              <TextInput
                activeUnderlineColor='#7C8C03'
                name='dailyPrice'
                placeholder='30'
                style={stylesForm.textInput}
                onChangeText={handleChange('dailyPrice')}
                onBlur={handleBlur('dailyPrice')}
                value={values.dailyPrice}
                keyboardType='number-pad'
              />
              {errors.dailyPrice && touched.dailyPrice && (
                <Text style={styles.errorText}>{errors.dailyPrice}</Text>
              )}
              <Text style={stylesForm.label}>What about a week?</Text>
              <TextInput
                activeUnderlineColor='#7C8C03'
                name='weeklyPrice'
                placeholder='180'
                style={stylesForm.textInput}
                onChangeText={handleChange('weeklyPrice')}
                onBlur={handleBlur('weeklyPrice')}
                value={values.weeklyPrice}
                keyboardType='number-pad'
              />
              {errors.weeklyPrice && touched.weeklyPrice && (
                <Text style={styles.errorText}>{errors.weeklyPrice}</Text>
              )}
              <Button
                onPress={handleSubmit}
                disabled={!isValid}
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

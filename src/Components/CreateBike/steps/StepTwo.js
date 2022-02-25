import React from 'react';
import { useValidateTwo } from '../hooks/useValidateTwo';
import { HelperText, Button, TextInput } from 'react-native-paper';
import { View, Text } from 'react-native';
import { styles } from '../../Login/styles';
import { Picker } from 'react-native-picker-picker-fix';
import { Formik } from 'formik';
import { useState } from 'react';
import { stylesForm } from './stylesForm';
import { colors } from '../../../colors';

export function StepTwo(props) {
  const [city, setCity] = useState(props.data.city || 'Trujillo');
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
                activeUnderlineColor={colors.primary}
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
              <Text style={stylesForm.label}>Wheel Size</Text>
              <TextInput
                activeUnderlineColor={colors.primary}
                name='height'
                placeholder='180'
                style={stylesForm.textInput}
                onChangeText={handleChange('height')}
                onBlur={handleBlur('height')}
                value={values.height}
              />
              {errors.height && touched.height && (
                <Text style={styles.errorText}>{errors.height}</Text>
              )}
              <Text style={stylesForm.label}>How much for a day?</Text>
              <TextInput
                activeUnderlineColor={colors.primary}
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
              <Button
                onPress={handleSubmit}
                disabled={!isValid}
                mode='contained'
                color={colors.primary}
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

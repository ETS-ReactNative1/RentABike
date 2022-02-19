import React from 'react';
import { useValidateTwo } from '../hooks/useValidateTwo';
import { View, Text, TextInput, Button } from 'react-native';
import { styles } from '../../Login/styles';
import { Picker } from 'react-native-picker-picker-fix';
import { Formik } from 'formik';
import { useState } from 'react';


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
              name='year'
              placeholder='2018'
              style={styles.textInput}
              onChangeText={handleChange('year')}
              onBlur={handleBlur('year')}
              value={values.year}
              keyboardType='number-pad'
            />
            {errors.year && touched.year && (
              <Text style={styles.errorText}>{errors.year}</Text>
            )}
            <Picker
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
            <TextInput
              name='dailyPrice'
              placeholder='30'
              style={styles.textInput}
              onChangeText={handleChange('dailyPrice')}
              onBlur={handleBlur('dailyPrice')}
              value={values.dailyPrice}
              keyboardType='number-pad'
            />
            {errors.dailyPrice && touched.dailyPrice && (
              <Text style={styles.errorText}>{errors.dailyPrice}</Text>
            )}
            <TextInput
              name='weeklyPrice'
              placeholder='180'
              style={styles.textInput}
              onChangeText={handleChange('weeklyPrice')}
              onBlur={handleBlur('weeklyPrice')}
              value={values.weeklyPrice}
              keyboardType='number-pad'
            />
            {errors.weeklyPrice && touched.weeklyPrice && (
              <Text style={styles.errorText}>{errors.weeklyPrice}</Text>
            )}
            <Picker
              name='helmet'
              id='helmet'
              onBlur={handleBlur('helmet')}
              selectedValue={includes.helmet}
              onValueChange={(itemValue, itemIndex) =>
                setIncludes((prev) => ({ ...prev, helmet: itemValue }))
              }
            >
              <Picker.Item label='None' value={0} />
              <Picker.Item label='01' value={1} />
              <Picker.Item label='02' value={2} />
            </Picker>
            <Picker
              name='elbowPads'
              id='elbowPads'
              onBlur={handleBlur('elbowPads')}
              selectedValue={includes.elbowPads}
              onValueChange={(itemValue, itemIndex) =>
                setIncludes((prev) => ({ ...prev, elbowPads: itemValue }))
              }
            >
              <Picker.Item label='None' value={0} />
              <Picker.Item label='01' value={1} />
              <Picker.Item label='02' value={2} />
            </Picker>
            <Picker
              name='kneePads'
              id='kneePads'
              onBlur={handleBlur('kneePads')}
              selectedValue={includes.kneePads}
              onValueChange={(itemValue, itemIndex) =>
                setIncludes((prev) => ({ ...prev, kneePads: itemValue }))
              }
            >
              <Picker.Item label='None' value={0} />
              <Picker.Item label='01' value={1} />
              <Picker.Item label='02' value={2} />
            </Picker>
            <Picker
              name='lock'
              id='lock'
              onBlur={handleBlur('lock')}
              selectedValue={includes.lock}
              onValueChange={(itemValue, itemIndex) =>
                setIncludes((prev) => ({ ...prev, lock: itemValue }))
              }
            >
              <Picker.Item label='No' value={false} />
              <Picker.Item label='Yes' value={true} />
            </Picker>
            <Button onPress={handleSubmit} title='Submit' disabled={!isValid} />
          </>
        )}
      </Formik>
    </View>
  );
}

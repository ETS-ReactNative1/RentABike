import React from 'react';
import { useValidateTwo } from '../hooks/useValidateTwo';
import { HelperText, Button, TextInput } from 'react-native-paper';
import { View, Text } from 'react-native';
import { styles } from '../../Login/styles';
import { Picker } from 'react-native-picker-picker-fix';
import { Formik } from 'formik';
import { useState } from 'react';
import { stylesForm } from './stylesForm';

export function StepThree(props) {
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
              <Text style={stylesForm.label}>Does it include helmet(s)?</Text>
              <Picker
                style={stylesForm.picker}
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
              <Text style={stylesForm.label}>Any pair of elbow pads?</Text>
              <Picker
                style={stylesForm.picker}
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
              <Text style={stylesForm.label}>Any pair of knee pads?</Text>
              <Picker
                style={stylesForm.picker}
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
              <Text style={stylesForm.label}>Maybe a lock?</Text>
              <Picker
                name='lock'
                style={stylesForm.picker}
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
              <Button
                onPress={handleSubmit}
                disabled={!isValid}
                mode='contained'
                color='#7C8C03'
                style={styles.submitButton}
              >
                Send
              </Button>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
}

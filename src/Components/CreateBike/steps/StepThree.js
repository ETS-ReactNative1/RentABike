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

export function StepThree(props) {
  const [helmets, setHelmets] = useState(Number(props.data.helmets) || 'None');
  const [elbowPads, setElbowPads] = useState(
    Number(props.data.elbowPads) || 'None',
  );
  const [kneePads, setKneePads] = useState(
    Number(props.data.kneePads) || 'None',
  );
  const [lock, setLock] = useState(props.data.lock === 'true' ? true : false);
  const bikeValidationSchema = useValidateTwo();
  const handleSubmit = (values) => {
    props.next({ ...values, helmets, elbowPads, kneePads, lock });
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
                selectedValue={helmets}
                onValueChange={(itemValue, itemIndex) => setHelmets(itemValue)}
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
                selectedValue={elbowPads}
                onValueChange={(itemValue, itemIndex) =>
                  setElbowPads(itemValue)
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
                selectedValue={kneePads}
                onValueChange={(itemValue, itemIndex) => setKneePads(itemValue)}
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
                selectedValue={lock}
                onValueChange={(itemValue, itemIndex) => setLock(itemValue)}
              >
                <Picker.Item label='No' value={false} />
                <Picker.Item label='Yes' value={true} />
              </Picker>
              <Button
                onPress={handleSubmit}
                disabled={!isValid}
                mode='contained'
                color={colors.primary}
                style={styles.submitButton}
              >
                Create!
              </Button>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
}

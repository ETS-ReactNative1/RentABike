import React from 'react';
import { Formik } from 'formik';
import { styles } from './styles';
import { View, Text, TextInput, Button } from 'react-native';
import { useSingUpVal } from './hooks/useLoginVal';
import { useLogin } from './hooks/useLogin';
import { useNavigation } from '@react-navigation/native';

export const LoginForm = () => {
  const navigation = useNavigation();
  const goToHome = ()=> navigation.navigate('TypeOfUser');
  const loginValidationSchema = useSingUpVal();
  return (
    <View style={styles.loginContainer}>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => {
          useLogin(values.email, values.password, goToHome);
        }}
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
              name='email'
              placeholder='Email Address'
              style={styles.textInput}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType='email-address'
            />
            {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <TextInput
              name='password'
              placeholder='Password'
              style={styles.textInput}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {errors.password && touched.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <Button onPress={handleSubmit} title='Submit' disabled={!isValid} />
          </>
        )}
      </Formik>
    </View>
  );
};

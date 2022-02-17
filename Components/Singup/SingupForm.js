import React from 'react';
import { Formik } from 'formik';
import { styles } from './styles';
import { View, Text, TextInput, Button } from 'react-native';
import { useSingUpVal } from './hooks/useSingUpVal';
import { useSingup } from './hooks/useSingup';
import { useNavigation } from '@react-navigation/native';

export const SingupForm = () => {
  const navigation = useNavigation();
  const goToHome = () => navigation.navigate('HomeScreen');
  const singupValidationSchema = useSingUpVal();
  return (
    <View style={styles.singupContainer}>
      <Formik
        validationSchema={singupValidationSchema}
        initialValues={{
          name: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={(values) =>
          useSingup(
            values.email,
            values.password,
            values.phone,
            values.name,
            goToHome,
          )
        }
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
              name='name'
              placeholder='Name'
              style={styles.textInput}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              keyboardType='default'
            />
            {errors.name && touched.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}
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
              name='phone'
              placeholder='Phone number'
              style={styles.textInput}
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
              keyboardType='number-pad'
            />
            {errors.phone && touched.phone && (
              <Text style={styles.errorText}>{errors.phone}</Text>
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
            <TextInput
              name='confirmPassword'
              placeholder='Repeat your password'
              style={styles.textInput}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              secureTextEntry
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
            <Button onPress={handleSubmit} title='Submit' disabled={!isValid} />
          </>
        )}
      </Formik>
    </View>
  );
};

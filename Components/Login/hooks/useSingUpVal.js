import { useState, useEffect } from 'react';

import * as yup from 'yup';

export const useSingUpVal = () => {
  const [validationSchema, setValidationSchema] = useState({});
  useEffect(() => {
    setValidationSchema(
      yup.object().shape({
        email: yup
          .string()
          .email('Please enter valid email')
          .required('Email Address is Required'),
        password: yup
          .string()
          .min(8, ({ min }) => `Password must be at least ${min} characters`)
          .required('Password is required'),
      }),
    );
  }, []);

  return validationSchema;
};

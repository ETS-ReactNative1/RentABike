import * as yup from 'yup';
import { useEffect, useState } from 'react';

export const useValidateOne = () => {
  const [validationSchema, setValidationSchema] = useState({});
  useEffect(() => {
    setValidationSchema(
      yup.object().shape({
        model: yup
          .string()
          .min(3, ({ min }) => `Model name must be at least ${min} characters`)
          .required('Model name is Required'),
        type: yup
          .string()
          .min(3, ({ min }) => `Type must be at least ${min} characters`)
          .required('Type is Required'),
      }),
    );
  }, []);

  return validationSchema;
};

import * as yup from 'yup';
import { useEffect, useState } from 'react';

export const useValidateTwo = () => {
  const [validationSchema, setValidationSchema] = useState({});
  useEffect(() => {
    setValidationSchema(
      yup.object().shape({
        year: yup
          .number()
          .max(2023, `You can't rent a bike from the future!`)
          .required('Year is Required'),
        dailyPrice: yup.number().required('Both prices are Required'),
        height: yup.string().required('Wheel Size Matters!'),
      }),
    );
  }, []);

  return validationSchema;
};

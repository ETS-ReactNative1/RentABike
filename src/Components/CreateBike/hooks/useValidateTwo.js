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
        /*      city: yup.string().required('City is Required'), */
        dailyPrice: yup.number().required('Both prices are Required'),
        weeklyPrice: yup.number().required('Both prices are Required'),
        /* helmets: yup.number(),
        elbowPads: yup.number(),
        kneePads: yup.number(),
        lock: yup.number(), */
        /*         pickUp: yup
          .date()
          .required('Fecha requerida')
          .test(
            'La fecha no puede se menor a la fecha actual',
            'La fecha Objetivo no puede estar vencida',
            (date) => {
              const cutoff = new Date();
              const selectedDate = date;
              return selectedDate >= cutoff;
            },
          ),
        dropOff: yup
          .date()
          .required('Fecha requerida')
          .test(
            'La fecha no puede se menor a la fecha actual',
            'La fecha Objetivo no puede estar vencida',
            (date) => {
              const cutoff = new Date();
              const selectedDate = date;
              return selectedDate >= cutoff;
            },
          ), */
      }),
    );
  }, []);

  return validationSchema;
};

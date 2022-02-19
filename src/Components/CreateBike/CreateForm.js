import React, { useState } from 'react';
import { StepOne } from './steps/StepOne';
import { StepTwo } from './steps/StepTwo';
import { View } from 'react-native';

export function CreateForm() {
  const [data, setData] = useState({
    model: '',
    type: '',
    img: '',
    year: "",
    city: '',
    dailyPrice: "",
    weeklyPrice: "",
    includes: {},
    pickup: '',
    dropoff: '',
  });
  const [currentStep, setCurrentStep] = useState(0);
  const handleNextStep = async (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev + 1);
  };
  const handlePrevStep = async (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };
  const submitHandler = async (newData) => {
    console.log('newData :', newData);
    // console.log('sesion :', Auth.getSession());
    // console.log('newData :', newData);
    // try {
    //   const session = await Auth.getSession();
    //   await axios.post(`${URL_BASE}/campaigns`, newData, {
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${session?.token}`,
    //     },
    //   });
    //   setModal(true);
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const steps = [
    <StepOne key="StepOne" next={handleNextStep} data={data} setData={setData}/>,
    <StepTwo
      key="StepTwo"
      next={submitHandler}
      prev={handlePrevStep}
      data={data}
    />,
  ];
  return <View>{steps[currentStep]}</View>;
}

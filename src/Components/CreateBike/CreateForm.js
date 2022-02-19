import React, { useState } from 'react';
import { StepOne } from './steps/StepOne';
import { StepTwo } from './steps/StepTwo';
import { View } from 'react-native';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { firebaseConfig } from '../../../config/database/firebase';
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
} from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export function CreateForm() {
  const [data, setData] = useState({
    model: '',
    type: '',
    img: '',
    year: '',
    city: '',
    dailyPrice: '',
    weeklyPrice: '',
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
    await onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('qué es user :', user);
        const uid = user.uid;
        try {
          await addDoc(collection(db, 'Bike'), {
            ...newData,
            available: true,
            ownerid: uid,
          });
        } catch (e) {
          console.error('Error adding document: ', e);
        }
      } else {
      }
    });
  };
  const steps = [
    <StepOne
      key='StepOne'
      next={handleNextStep}
      data={data}
      setData={setData}
    />,
    <StepTwo
      key='StepTwo'
      next={submitHandler}
      prev={handlePrevStep}
      data={data}
    />,
  ];
  return <View>{steps[currentStep]}</View>;
}

import React, { useState, useEffect } from 'react';
import { StepOne } from './steps/StepOne';
import { StepTwo } from './steps/StepTwo';
import { StepThree } from './steps/StepThree';
import { Alert, ScrollView, View } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { firebaseConfig } from '../../../config/database/firebase';
import {
  collection,
  addDoc,
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export function CreateForm(props) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  useEffect(async () => {
    setLoading(true);
    if (props.params) {
      console.log('Modo Editar');
      try {
        const bikeRef = doc(db, 'Bike', props.params.id);
        const bikeSnap = await getDoc(bikeRef);
        const bikeData = bikeSnap.data();
        setData({
          ...data,
          available: bikeData.available,
          year: bikeData.year,
          type: bikeData.type,
          description: bikeData.description || 'No description available.',
          height: bikeData.height || "6'9''",
          city: bikeData.city,
          dailyPrice: bikeData.dailyPrice,
          img: bikeData.img,
          elbowPads: bikeData.elbowPads || 1,
          kneePads: bikeData.kneePads || 1,
          helmets: bikeData.helmets || 1,
          lock: bikeData.lock || true,
          model: bikeData.model,
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Modo Crear');
      setData({
        model: '',
        type: '',
        img: '',
        year: '',
        city: '',
        dailyPrice: '',
        weeklyPrice: '',
        elbowPads: '',
        kneePads: '',
        helmets: '',
        lock: '',
        pickup: '',
        dropoff: '',
      });
      setLoading(false);
    }
  }, []);
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
    const uid = auth.currentUser.uid;
    try {
      if (!props.params) {
        await addDoc(collection(db, 'Bike'), {
          ...newData,
          available: true,
          ownerid: uid,
        });
      } else if (props.params) {
        await setDoc(doc(db, 'Bike', props.params.id), {
          ...newData,
          ownerid: uid,
        });
      }
      Alert.alert('Congratulations!', 'Your bike was added to our catalog', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('TypeOfUserScreen'),
        },
      ]);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
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
      next={handleNextStep}
      prev={handlePrevStep}
      data={data}
    />,
    <StepThree
      key='StepThree'
      next={submitHandler}
      prev={handlePrevStep}
      data={data}
    />,
  ];
  return <ScrollView>{!loading && steps[currentStep]}</ScrollView>;
}

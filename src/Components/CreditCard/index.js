import { View, Text, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  getFirestore,
  doc,
  getDoc,
} from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loading from '../Loading';
import { colors } from '../../colors';
import {
  CardField,
  CardForm,
  useStripe,
  useConfirmPayment,
} from '@stripe/stripe-react-native';

const db = getFirestore();
const testUri =
  'https://us-central1-rent-abike.cloudfunctions.net/createPaymentIntent';
export function CreditCard(props) {
  const {
    navigation,
    route: { params },
  } = props;

  const [userData, setUserData] = useState({});
  const [ownerData, setOwnerData] = useState({});
  const [loading2, setLoading2] = useState(false);
  const { confirmPayment, loading } = useConfirmPayment();
  const userRef = doc(db, 'User', params.userId);
  const OwnerRef = doc(db, 'User', params.ownerId);
  const handlePayPress = async () => {
    setLoading2(true);
    try {
      const response = await fetch(testUri, {
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price: params.price,
        }),
      });
      await addDoc(collection(db, 'Rent'), {
        amount: params.price,
        pickUp: JSON.stringify(new Date(params.date)),
        days: params.days,
        bikeId: params.bikeId,
        bikeModel: params.bikeModel,
        bikeImg: params.bikeImg,
        bikeCity: params.bikeCity,
        ownerId: params.ownerId,
        ownerName: ownerData.name,
        ownerImg: ownerData.img,
        userId: params.userId,
        userName: userData.name,
        userImg: userData.img,
      });

      const data = await response.json();
      console.log('data :', data);
      const clientSecret = await data.paymentIntent;
      const { error, paymentIntent } = await confirmPayment(clientSecret, {
        type: 'Card',
        billingDetails: { name: 'User Test' },
      });
      if (error) {
        console.log('error :', error);
        Alert.alert(`Error code ${error.code}`, error.message);
      } else if (paymentIntent) {
        Alert.alert('Success', `Payment successful: ${paymentIntent.id}`, [
          {
            text: 'OK',
            onPress: () =>
              navigation.navigate('RentTabNavigation', { type: 'renter' }),
          },
        ]);
      }
      setLoading2(false);
    } catch (error) {
      setLoading2(false);
      console.log('error en el catch :', error);
    }
  };
  useEffect(async () => {
    setLoading2(true);
    try {
      const userSnap = await getDoc(userRef);
      const userdata = userSnap.data();
      setUserData(userdata);
      const ownerSnap = await getDoc(OwnerRef);
      const ownerdata = ownerSnap.data();
      setOwnerData(ownerdata);
      setLoading2(false);
    } catch (e) {
      console.error('Error adding document: ', e);
      setLoading2(false);
    }
  }, []);

  return (
    <>
      <Loading loading={loading || loading2} />
      <SafeAreaView style={{ padding: 26 }}>
        <Text
          style={{
            width: '100%',
            fontSize: 62,
            textAlign: 'center',
            color: colors.dark2,
            fontWeight: 'bold',
          }}
        >
          Renting a Bike!
        </Text>

        <Text
          style={{
            width: '100%',
            fontSize: 16,
            fontSize: 24,
            textAlign: 'center',
          }}
        >
          {`${params.bikeModel} for `}
          <Text style={{ fontWeight: 'bold' }}>${params.price}</Text>
        </Text>

        <CardForm
          onFormComplete={(cardDetails) => {
            console.log('card details', cardDetails);
          }}
          style={{ height: 270 }}
        />
        <Button
          title='Pay'
          onPress={handlePayPress}
          disabled={loading}
          color={colors.primary}
          mode='contained'
        >
          Pay
        </Button>
      </SafeAreaView>
    </>
  );
}

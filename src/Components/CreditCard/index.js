import { View, Text, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import React, { useState } from 'react';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loading from '../Loading';
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

  const [card, setCard] = useState(); // para luego guardar las tarjetas
  const [loading2, setLoading2] = useState(false);
  const { confirmPayment, loading } = useConfirmPayment();
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
        bikeId: params.bike,
        ownerId: params.owner,
        userId: params.user,
        pickUp: JSON.stringify(new Date(params.date)),
        amount: params.price,
        days: params.days,
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
  return (
    <>
      <Loading loading={loading || loading2} />
      <SafeAreaView style={{ padding: 26 }}>
        <Text
          style={{
            width: '100%',
            fontSize: 62,
            textAlign: 'center',
            color: '#7C8C03',
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
        >{`${params.bikeModel} for $${params.price}`}</Text>

        <CardForm
          onFormComplete={(cardDetails) => {
            console.log('card details', cardDetails);
            setCard(cardDetails);
          }}
          style={{ height: 270 }}
        />
        <Button
          title='Pay'
          onPress={handlePayPress}
          disabled={loading}
          color={'#7C8C03'}
          mode='contained'
        >
          Pay
        </Button>
      </SafeAreaView>
    </>
  );
}

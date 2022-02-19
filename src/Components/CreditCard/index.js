import { View, Text, Alert, Button } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  CardField,
  CardForm,
  useStripe,
  useConfirmPayment,
} from '@stripe/stripe-react-native';
/* import { Button } from 'react-native-paper'; */

const price = 5000; // cambiar por uuid y que la cloud function calcule el precio
const testUri =
  'https://us-central1-rent-abike.cloudfunctions.net/createPaymentIntent';
export function CreditCard() {
  const navigation = useNavigation();
  const [card, setCard] = useState();
  /*   const { confirmPayment } = useStripe(); */
  const { confirmPayment, loading } = useConfirmPayment();
  const handlePayPress = async () => {
    try {
      const response = await fetch(testUri, {
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price,
        }),
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
        Alert.alert(
            "Success",
            `Payment successful: ${paymentIntent.id}`,
            [
              { text: "OK", onPress: () => navigation.navigate('RentTabNavigation') }
            ]
          );
      }
    } catch (error) {
      console.log('error en el catch :', error);
    }
  };
  return (
    <SafeAreaView>
      <CardForm
        onFormComplete={(cardDetails) => {
          console.log('card details', cardDetails);
          setCard(cardDetails);
        }}
        style={{ height: 270 }}
      />
      {/* <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
          borderColor: '#000000',
          borderWith: 1,
          borderRadius: 8,
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={(cardDetails) => {
          console.log('cardDetails', cardDetails); }
      } onFocus=
      {(focusedField) => {
        console.log('focusField', focusedField);
      }}
      /> */}
      <Button title='Pay' onPress={handlePayPress} disabled={loading} />
    </SafeAreaView>
  );
}

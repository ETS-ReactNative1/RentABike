import { View, Text, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../config/database/firebase';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { TextInput, Button } from 'react-native-paper';
import Loading from '../Loading';
import { colors } from '../../colors';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let user;
let userId;
const db = getFirestore();

export function Reserve(props) {
  const {
    navigation,
    route: { params },
  } = props;
  const bikeRef = doc(db, 'Bike', params.bike);
  const ownerRef = doc(db, 'User', params.owner);
  const [days, setDays] = useState('1');
  const [bikeData, setBikeData] = useState([]);
  const [loading, setLoading] = useState(false);
  //datepicker
  const [date, setDate] = useState(new Date(Date.now()));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [pickUp, setPickUp] = useState(date);
  const [dropOff, setDropOff] = useState(
    new Date(Date.now() + 24 * 60 * 60 * 1000),
  );

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setPickUp(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  //
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const toDay = (time) => time.split('-')[2].split('T')[0];
  const toMonth = (time) => months[Number(time.split('-')[1]) - 1];
  //
  useEffect(async () => {
    setLoading(true);
    try {
      user = auth.currentUser;
      userId = user.uid;
      const bikeSnap = await getDoc(bikeRef);
      const bikedata = bikeSnap.data();
      setBikeData(bikedata);
      setLoading(false);
    } catch (e) {
      console.error('Error adding document: ', e);
      setLoading(false);
    }
  }, []);
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: colors.background,
      }}
    >
      <Loading loading={loading} />
      <SafeAreaView>
        {!loading && (
          <View style={{ padding: 26 }}>
            <View
              style={{
                width: '100%',
                padding: 8,
                borderWidth: 2,
                height: 200,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
              }}
            >
              <View
                style={{
                  width: '45%',
                  height: 180,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRightWidth: 1,
                  paddingRight: 8,
                }}
              >
                <Text style={{ fontSize: 24 }}>Pick Up</Text>
                <Text style={{ fontSize: 52, fontWeight: 'bold' }}>
                  {toDay(JSON.stringify(pickUp))}
                </Text>
                <Text style={{ fontSize: 28 }}>
                  {toMonth(JSON.stringify(pickUp))}
                </Text>
              </View>
              <View
                style={{
                  width: '45%',
                  height: 180,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingLeft: 8,
                }}
              >
                <Text style={{ fontSize: 24 }}>Drop Off</Text>
                <Text style={{ fontSize: 52, fontWeight: 'bold' }}>
                  {toDay(JSON.stringify(dropOff))}
                </Text>
                <Text style={{ fontSize: 28 }}>
                  {toMonth(JSON.stringify(dropOff))}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                padding: 8,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                alignContent: 'center',
                marginTop: 12,
              }}
            >
              <Button
                onPress={showDatepicker}
                style={{
                  width: '45%',
                  height: 40,
                  marginVertical: 10,
                }}
                mode='contained'
                color={colors.backgroundDarker}
              >
                Pick a date
              </Button>
              <View
                style={{
                  width: '50%',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <TextInput
                  label={'How many days'}
                  placeholder='1'
                  style={{
                    width: '100%',
                    height: 60,
                    textAlign: 'center',
                    backgroundColor: 'none',
                  }}
                  activeUnderlineColor={colors.primary}
                  keyboardType='numeric'
                  onChangeText={(value) => {
                    setDropOff(
                      new Date(date.getTime() + value * 24 * 60 * 60 * 1000),
                    );
                    setDays(value);
                  }}
                />
              </View>
            </View>
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 4,
                marginTop: 6,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  width: '45%',
                  textAlign: 'left',
                }}
              >
                Price per day:
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  width: '45%',
                  textAlign: 'right',
                }}
              >{`$${bikeData.dailyPrice}`}</Text>
            </View>
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                padding: 4,
                marginBottom: 6,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  width: '45%',
                  textAlign: 'left',
                }}
              >
                Total price:
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  width: '45%',
                  textAlign: 'right',
                }}
              >{`$${Number(bikeData.dailyPrice) * Number(days)}`}</Text>
            </View>
            <View>
              {show && (
                <DateTimePicker
                  testID='dateTimePicker'
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display='default'
                  onChange={onChange}
                />
              )}
            </View>
            <Button
              onPress={() =>
                navigation.navigate('CreditCardScreen', {
                  price: Number(bikeData.dailyPrice) * Number(days),
                  bikeId: params.bike,
                  bikeModel: bikeData.model,
                  bikeCity: bikeData.city,
                  bikeImg: bikeData.img,
                  ownerId: params.owner,
                  ownerPushToken: params.ownerPushToken,
                  userId: userId,
                  days: Number(days),
                  date: date.getTime() + 24 * 60 * 60 * 1000,
                })
              }
              mode='contained'
              color={colors.primary}
              style={{ marginVertical: 6 }}
            >
              Confirm and pay
            </Button>
            <Button
              onPress={() => navigation.goBack()}
              color={colors.secundary}
            >
              Cancel
            </Button>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

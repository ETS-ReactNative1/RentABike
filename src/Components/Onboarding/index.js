import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../colors';

import Onboarding from 'react-native-onboarding-swiper';

const bike = require('../../../assets/bike.png');
const money = require('../../../assets/money.png');
const paying = require('../../../assets/paying.png');
const feedback = require('../../../assets/feedback.png');

const Dots = ({ selected }) => {
  let backgroundColor;

  backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

const Skip = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text style={{ fontSize: 16 }}>Skip</Text>
  </TouchableOpacity>
);

const Next = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text style={{ fontSize: 16 }}>Next</Text>
  </TouchableOpacity>
);

const Done = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text style={{ fontSize: 16 }}>Done</Text>
  </TouchableOpacity>
);

export const OnOnboarding = ({ navigation }) => {
  return (
    <Onboarding
      containerStyles={{ paddingHorizontal: 12 }}
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => navigation.replace('TypeOfUserScreen')}
      onDone={() => navigation.replace('TypeOfUserScreen')}
      pages={[
        {
          backgroundColor: colors.secundary,
          titleStyles: {
            fontSize: 32,
            color: colors.background,
            fontWeight: 'bold',
            marginBottom: 0,
          },
          subTitleStyles: {
            fontSize: 18,
            color: colors.background,
            fontWeight: 'bold',
            marginTop: 0,
          },
          /* backgroundColor: '#a6e4d0', */
          image: <Image style={{ width: 320, height: 320 }} source={bike} />,
          title: 'Welcome to RentaBike!',
          subtitle: 'Let me tell you what you can do with us!',
        },
        {
          backgroundColor: colors.primary,
          /* backgroundColor: '#fdeb93', */
          titleStyles: {
            fontSize: 32,
            color: colors.background,
            fontWeight: 'bold',
            marginBottom: 0,
          },
          subTitleStyles: {
            fontSize: 18,
            color: colors.background,
            fontWeight: 'bold',
            marginTop: 0,
          },
          image: <Image style={{ width: 320, height: 320 }} source={paying} />,
          title: 'Rent a bike without leaving your house',
          subtitle:
            'Stop wasting money on taxis, renting a bike is much cheaper and healthier',
        },
        {
          backgroundColor: colors.backgroundDarker,
          /* backgroundColor: '#e9bcbe', */
          titleStyles: {
            fontSize: 32,
            color: colors.background,
            fontWeight: 'bold',
            marginBottom: 0,
          },
          subTitleStyles: {
            fontSize: 18,
            color: colors.background,
            fontWeight: 'bold',
            marginTop: 0,
          },
          image: <Image style={{ width: 320, height: 320 }} source={money} />,
          title: 'Rent your unused bikes!',
          subtitle:
            'If you have extra bicycles, what are you waiting for to start earning money with us!',
        },
      ]}
    />
  );
};

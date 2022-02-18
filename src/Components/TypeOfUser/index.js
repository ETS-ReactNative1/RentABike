import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
} from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export const TypeOfUser = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Button
        onPress={() =>
          navigation.navigate('RentTabNavigation', {
            type: 'renter',
          })
        }
      >
        I want a bike
      </Button>
      <Button
        onPress={() =>
          navigation.navigate('RentTabNavigation', {
            type: 'owner',
          })
        }
      >
        I have a bike
      </Button>
    </SafeAreaView>
  );
};

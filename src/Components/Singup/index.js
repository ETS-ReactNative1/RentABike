import React, { useState } from 'react';
import { SingupForm } from './SingupForm';
import { View, Text, TextInput, Button, Image, ScrollView } from 'react-native';
import { styles } from '../Login/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loading from '../Loading';

export const Singup = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Loading loading={loading} />
      <SafeAreaView style={styles.login}>
        <ScrollView>
          <Image
            style={styles.cover}
            source={{
              uri: 'https://images.pexels.com/photos/1548771/pexels-photo-1548771.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            }}
          />
          <SingupForm navigation={navigation} setLoading={setLoading} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

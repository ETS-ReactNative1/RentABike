import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { Image, Text, View } from 'react-native';
import Loading from '../Loading';

export const Login = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  return (
    <View>
      <Loading loading={loading} />
      <SafeAreaView style={styles.login}>
        <Image
          style={styles.cover}
          source={{
            uri: 'https://images.pexels.com/photos/5914907/pexels-photo-5914907.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          }}
        />
        <LoginForm navigation={navigation} setLoading={setLoading} />
      </SafeAreaView>
    </View>
  );
};

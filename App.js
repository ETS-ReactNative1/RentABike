import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer for a long period of time']);
import { StatusBar } from 'expo-status-bar';
import { isDevice } from 'expo-device';
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect, useRef } from 'react';
/* import { Platform, Linking } from 'react-native'; */
import * as Linking from 'expo-linking';
/* import { initStripe } from '@stripe/stripe-react-native'; */
import { StripeProvider } from '@stripe/stripe-react-native';
import { registerForPushNotifications } from './src/utils/registerForPushNotifications';

import NavigationStack from './src/navigation/NavigationStack';
import RentTabNavigation from './src/navigation/RentTabNavigation';
import { publishableKey } from './config/secret';
import { store } from './src/store';
import { Provider } from 'react-redux';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
const prefix = Linking.createURL('/');

export default function App() {
  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        messages: 'MessageScreen',
      },
    },
  };
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    const registerforPushNotificationsEffect =
      registerForPushNotifications().then((token) => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      registerforPushNotificationsEffect();
      Notifications.removeNotificationSubscription(
        notificationListener.current,
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  useEffect(() => {
    if (
      lastNotificationResponse &&
      lastNotificationResponse.notification.request.content.data.url &&
      lastNotificationResponse.actionIdentifier ===
        Notifications.DEFAULT_ACTION_IDENTIFIER
    ) {
      Linking.openURL(
        lastNotificationResponse.notification.request.content.data.url,
      );
    }
  }, [lastNotificationResponse]);
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={publishableKey}>
        <NavigationContainer linking={linking}>
          <NavigationStack />
        </NavigationContainer>
      </StripeProvider>
    </Provider>
  );
}
